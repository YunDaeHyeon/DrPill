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
# Google Cloud Vision
from google.cloud import vision

# 환경변수 로드
load_dotenv()

# roboflow connection
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("API_KEY")
)

# Google Cloud Vision 설정
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './drpill-444115-7bcbddc32456.json'
client = vision.ImageAnnotatorClient()

app = Flask(__name__)

# HSV 범위 기반 색상 매핑
# 하양, 노랑, 주황, 분홍, 빨강, 갈색, 연두, 초록, 청록, 파랑, 남색, 자주, 보라, 회색, 검정, 투명
COLOR_RANGES = {
    "빨강": [(0, 50, 50), (10, 255, 255)],
    "주황": [(11, 50, 50), (22, 255, 255)],
    "노랑": [(23, 50, 50), (38, 255, 255)],
    "연두": [(36, 50, 50), (70, 255, 255)],
    "초록": [(71, 50, 50), (85, 255, 255)],
    "청록": [(86, 50, 50), (100, 255, 255)],
    "파랑": [(101, 50, 50), (130, 255, 255)],
    "남색": [(131, 50, 50), (140, 255, 255)],
    "보라": [(141, 50, 50), (160, 255, 255)],
    "자주": [(161, 50, 50), (180, 255, 255)],
    "하양": [(0, 0, 200), (180, 20, 255)],
    "회색": [(0, 0, 50), (180, 20, 200)],
    "검정": [(0, 0, 0), (180, 255, 50)],
    "투명": [(0, 0, 0), (0, 0, 0)]
}

def select_color_by_hsv(image, mask=None):
    """
    HSV 값 기반으로 주요 색상을 추출하고, 한글 이름으로 매핑합니다.
    """
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    if mask is not None:
        hsv_image = cv2.bitwise_and(hsv_image, hsv_image, mask=mask)

    pixels = hsv_image.reshape(-1, 3)
    color_counts = {color: 0 for color in COLOR_RANGES.keys()}
    for pixel in pixels:
        for color_name, (lower, upper) in COLOR_RANGES.items():
            if all(lower[i] <= pixel[i] <= upper[i] for i in range(3)):
                color_counts[color_name] += 1
                break

    sorted_colors = sorted(color_counts.items(), key=lambda x: x[1], reverse=True)
    return sorted_colors[0][0] if sorted_colors[0][1] > 0 else "알 수 없음"

# 원형, 타원형, 장방형, 반원형, 삼각형, 사각형, 마름모형, 오각형, 육각형, 팔각형
def detect_shape(image, mask=None, visualize=False):
    """
    약 모양을 감지하고 한글 이름으로 반환하며, 시각화 옵션을 지원합니다.
    """
    image_copy = image.copy()
    imgray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    if mask is not None:
        imgray = cv2.bitwise_and(imgray, imgray, mask=mask)
    blur = cv2.GaussianBlur(imgray, (5, 5), 0)
    _, thr = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thr, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for cont in contours:
        if cv2.contourArea(cont) < 500:  # 작은 노이즈 제거
            continue

        # 외곽선 단순화 및 꼭짓점 개수 계산
        epsilon = 0.02 * cv2.arcLength(cont, True)
        approx = cv2.approxPolyDP(cont, epsilon, True)
        vertex_count = len(approx)

        # 객체의 경계박스와 종횡비 계산
        x, y, w, h = cv2.boundingRect(approx)
        aspect_ratio = w / float(h)

        # 모양 매칭
        if vertex_count >= 8 and 0.9 <= aspect_ratio <= 1.1:
            label = "원형"
        elif vertex_count >= 8:
            label = "타원형"
        elif vertex_count == 2 or (vertex_count == 4 and 0.9 <= aspect_ratio <= 1.1):
            label = "장방형"
        elif vertex_count == 4:
            label = "사각형"
        elif vertex_count == 3:
            label = "삼각형"
        elif vertex_count == 5:
            label = "오각형"
        elif vertex_count == 6:
            label = "육각형"
        elif vertex_count == 8:
            label = "팔각형"
        elif vertex_count == 4 and aspect_ratio < 0.8:
            label = "마름모형"
        else:
            label = "기타"  # 모양을 특정할 수 없는 경우

        # 시각화
        if visualize:
            cv2.drawContours(image_copy, [approx], -1, (0, 255, 0), 2)  # 외곽선 그리기
            mmt = cv2.moments(cont)
            if mmt['m00'] != 0:
                cx = int(mmt['m10'] / mmt['m00'])
                cy = int(mmt['m01'] / mmt['m00'])
                cv2.putText(image_copy, label, (cx, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

        return label, image_copy

    return "알 수 없음", image_copy


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
            top_left_x = int(x_center - (width / 2))
            top_left_y = int(y_center - (height / 2))
            bottom_right_x = int(x_center + (width / 2))
            bottom_right_y = int(y_center + (height / 2))

            # 바운딩 박스를 좌상단과 우하단 좌표로 변환
            box = [top_left_x, top_left_y, bottom_right_x, bottom_right_y]

            # 감지된 객체 정보 추가
            detections.append({"label": label, "box": box})

            # 이미지를 바운딩 박스 크기로 자르기
            cropped_img = image.crop((top_left_x, top_left_y, bottom_right_x, bottom_right_y))
            background_crop_img = remove(np.array(cropped_img))
            background_crop_img = Image.fromarray(background_crop_img)

            # Google Vision 텍스트 추출
            cropped_img_bytes = io.BytesIO()
            background_crop_img.save(cropped_img_bytes, format='PNG')
            cropped_img_bytes = cropped_img_bytes.getvalue()

            vision_image = vision.Image(content=cropped_img_bytes)
            response = client.text_detection(image=vision_image)
            texts = response.text_annotations

            rgba_image = np.array(background_crop_img)
            alpha_channel = rgba_image[:, :, 3]
            mask = alpha_channel > 0

            background_cropped_img_cv = cv2.cvtColor(np.array(background_crop_img.convert('RGB')), cv2.COLOR_RGB2BGR)

            # HSV 색상 분석
            color_name = select_color_by_hsv(background_cropped_img_cv, mask.astype(np.uint8) * 255)

            # 모양 분석
            shape = detect_shape(background_cropped_img_cv, mask.astype(np.uint8) * 255)

            # 객체별 텍스트 출력
            related_text = texts[0].description if texts else "No text detected"

            # 잘라낸 이미지를 base64로 인코딩
            img_byte_io = BytesIO()
            cropped_img.save(img_byte_io, format='PNG')
            img_byte_io.seek(0)

            img_base64 = base64.b64encode(img_byte_io.getvalue()).decode('utf-8')

            # 응답 데이터에 추가
            base64_images.append({
                "label": label,
                "image": img_base64,
                "color": color_name,
                "shape": shape,
                "text" : related_text,
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