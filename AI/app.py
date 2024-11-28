import cv2, os
from flask import Flask, request, jsonify
import numpy as np
from io import BytesIO
import base64
import math
# 배경제거
from rembg import remove
from PIL import Image
# 환경변수
from dotenv import load_dotenv
# roboflow
from inference_sdk import InferenceHTTPClient

# 환경변수 로드
load_dotenv()

# roboflow connection
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("API_KEY")
)

app = Flask(__name__)

# 색상 이름 및 RGB 값 매핑
COLOR_NAMES = {
    "빨강": (0, 0, 255),
    "주황": (0, 165, 255),
    "노랑": (0, 255, 255),
    "연두": (0, 255, 0),
    "초록": (0, 128, 0),
    "청록": (0, 255, 255),
    "파랑": (255, 0, 0),
    "남색": (128, 0, 128),
    "보라": (255, 0, 255),
    "자주": (255, 0, 255),
    "갈색": (42, 42, 165),
    "회색": (128, 128, 128),
    "검정": (0, 0, 0),
    "흰색": (255, 255, 255),
    "투명": (0, 0, 0)
}

# 색상 매핑
def select_color(bgr_value):
    min_distance = float('inf')  # 초기 최소 거리값 무한
    select_color_name = None

    for color_name, rgb_value in COLOR_NAMES.items():
        distance = math.sqrt(sum([(a - b) ** 2 for a, b in zip(bgr_value, rgb_value)]))
        if distance < min_distance:
            min_distance = distance
            select_color_name = color_name

    return select_color_name

# 평균 색상 산출
def get_average_color(image, mask=None):
    mean_color = cv2.mean(image, mask=mask)[:3]
    return tuple(int(val) for val in mean_color)

@app.route('/')
def hello_world():
        return '기업연계 19조'

@app.route('/upload-image', methods=['POST'])
def detect_and_crop():
    # 이미지 파일 불러오기
    file = request.files['photo']  # 이미지 파일 이름: 'photo'
    # FireStorage로 받아온 이미지를 PIL 이미지로 변환
    image = Image.open(file.stream)

    # 모델 예측 호출
    result = CLIENT.infer(image, model_id="wku-drug-detection/3")
    # result에 'predictions' 필드가 있는지, 그 값이 존재하는지 확인한다.
    if 'predictions' in result and isinstance(result['predictions'], list):
        predictions = result['predictions']

        # 모델에서 넘어온 객체 감지 결과값 파싱 후 리스트에 저장
        detections = []
        # 응답을 위한 리스트
        base64_images = []
        for idx, prediction in enumerate(predictions):
            x_center = prediction['x']
            y_center = prediction['y']
            width = prediction['width']
            height = prediction['height']
            label = prediction['class']

            # 좌상단과 우하단 좌표 계산
            top_left_x = x_center - (width / 2)
            top_left_y = y_center - (height / 2)
            bottom_right_x = x_center + (width / 2)
            bottom_right_y = y_center + (height / 2)

            # 바운딩 박스를 좌상단과 우하단 좌표로 변환
            box = [top_left_x, top_left_y, bottom_right_x, bottom_right_y]

            # 감지된 객체 정보 추가
            detections.append({"label": label, "box": box})

            # 이미지를 바운딩 박스 크기로 자르기
            cropped_img = image.crop((top_left_x, top_left_y, bottom_right_x, bottom_right_y))

            # 잘라낸 이미지를 새로운 파일로 저장 (이때 저장되는 이미지 형식은 'RGBA'이다.)
            background_crop_img = remove(np.array(cropped_img))
            background_crop_img = Image.fromarray(background_crop_img)

            # RGBA 이미지에서 알파 채널 추출 (배경을 제외한 부분만)
            rgba_image = np.array(background_crop_img)
            alpha_channel = rgba_image[:, :, 3]  # 알파 채널 추출

            # 투명도가 있는 영역을 제외하는 마스크 생성 (투명도가 0인 영역만 제외)
            mask = alpha_channel > 0

            # BGR 이미지로 변환 (RGBA에서 BGR로)
            background_cropped_img_cv = cv2.cvtColor(np.array(background_crop_img.convert('RGB')), cv2.COLOR_RGB2BGR)

            # 평균 색상 계산 (배경 제외)
            average_color = get_average_color(background_cropped_img_cv, mask.astype(np.uint8) * 255)

            # BGR 값으로 색상 이름 탐색
            color_name = select_color(average_color)


            # 잘라낸 이미지를 base64로 인코딩
            img_byte_io = BytesIO()
            cropped_img.save(img_byte_io, format='PNG')
            img_byte_io.seek(0)

            # 전달을 위해 인코딩 변환
            img_base64 = base64.b64encode(img_byte_io.getvalue()).decode('utf-8')

            # 이미지를 리스트에 추가 (색상 정보도 함께 포함)
            base64_images.append({
                "label": label,
                "image": img_base64,
                "color": color_name,  # 색상 이름 추가
                "shape": "원형",
                "descript": "WKU"
            })
    
        # 감지된 객체 출력
        if not detections:
            print("감지된 약이 없습니다.")
            return jsonify({"message": "검출된 약이 존재하지 않습니다."}), 400
        else:
            # 감지된 이미지와 객체 정보 JSON으로 응답
            return jsonify({
                "detections": detections,
                "images": base64_images
            }), 200
            print(detections)
    else:
        print("알 수 없는 오류 발생. (predictions 값이 존재하지 않습니다.)")
        return jsonify({"message": "이미지를 처리하는 중 오류가 발생하였습니다."}), 500

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5001, debug=True)

        path = "./test_img1.jpg"
result = CLIENT.infer(path, model_id="wku-drug-detection/3")