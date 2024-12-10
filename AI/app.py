import cv2, os
import io
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
    print("Step 1: 이미지 업로드 요청 처리 시작")
    
    # 이미지 파일 불러오기
    file = request.files.get('photo')  # 이미지 파일 이름: 'photo'
    if not file:
        print("Error: 이미지 파일이 전달되지 않음")
        return jsonify({"message": "이미지 파일이 전달되지 않았습니다."}), 400
    
    print("Step 2: 업로드된 파일 변환 중")
    try:
        image = Image.open(file.stream)
    except Exception as e:
        print(f"Error: 이미지 열기 실패 - {e}")
        return jsonify({"message": "이미지를 열 수 없습니다."}), 400

    print("Step 3: Roboflow 모델 호출 시작")
    try:
        result = CLIENT.infer(image, model_id="wku-drug-detection/3")
    except Exception as e:
        print(f"Error: Roboflow 모델 호출 실패 - {e}")
        return jsonify({"message": "객체 감지 중 오류 발생"}), 500

    if 'predictions' not in result or not isinstance(result['predictions'], list):
        print("Error: Roboflow 모델 호출 결과가 유효하지 않음")
        return jsonify({"message": "객체 감지 결과가 유효하지 않습니다."}), 400

    print(f"Step 4: 객체 감지 완료 - 총 {len(result['predictions'])}개 객체 감지")
    
    # 모델에서 넘어온 객체 감지 결과값 파싱 후 리스트에 저장
    detections = []
    base64_images = []

    for idx, prediction in enumerate(result['predictions']):
        print(f"Processing object {idx+1}/{len(result['predictions'])}")
        
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

        print(f" - 객체 좌표: Top Left ({top_left_x}, {top_left_y}), Bottom Right ({bottom_right_x}, {bottom_right_y})")

        # 바운딩 박스를 좌상단과 우하단 좌표로 변환
        box = [top_left_x, top_left_y, bottom_right_x, bottom_right_y]
        detections.append({"label": label, "box": box})

        # 이미지를 바운딩 박스 크기로 자르기
        print(" - 객체 크롭 및 배경 제거 진행 중")
        cropped_img = image.crop((top_left_x, top_left_y, bottom_right_x, bottom_right_y))
        background_crop_img = remove(np.array(cropped_img))
        background_crop_img = Image.fromarray(background_crop_img)

        # Google Vision 텍스트 추출
        print(" - Google Vision API를 사용한 텍스트 추출 중")
        try:
            cropped_img_bytes = io.BytesIO()
            background_crop_img.save(cropped_img_bytes, format='PNG')
            cropped_img_bytes = cropped_img_bytes.getvalue()

            vision_image = vision.Image(content=cropped_img_bytes)
            response = client.text_detection(image=vision_image)
            texts = response.text_annotations
            related_text = texts[0].description if texts else "No text detected"
        except Exception as e:
            print(f"Error: Google Vision API 호출 실패 - {e}")
            related_text = "텍스트 추출 실패"

        print(f" - 추출된 텍스트: {related_text}")

        # HSV 색상 분석
        print(" - HSV 색상 분석 진행 중")
        rgba_image = np.array(background_crop_img)
        alpha_channel = rgba_image[:, :, 3]
        mask = alpha_channel > 0
        background_cropped_img_cv = cv2.cvtColor(np.array(background_crop_img.convert('RGB')), cv2.COLOR_RGB2BGR)
        color_name = select_color_by_hsv(background_cropped_img_cv, mask.astype(np.uint8) * 255)
        print(f" - 감지된 색상: {color_name}")

        # 모양 분석
        print(" - 모양 분석 진행 중")
        shape, _ = detect_shape(background_cropped_img_cv, mask.astype(np.uint8) * 255)  # 수정: 이미지 반환 제거
        print(f" - 감지된 모양: {shape}")

        # 잘라낸 이미지를 base64로 인코딩
        print(" - 객체 이미지 Base64 인코딩 중")
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
            "descript": related_text,
        })

    # 감지된 객체 출력
    if not detections:
        print("감지된 약이 없습니다.")
        return jsonify({"message": "검출된 약이 존재하지 않습니다."}), 400
    else:
        print(f"총 {len(detections)}개의 객체가 감지되었습니다.")
        return jsonify({
            "detections": detections,  # 그대로 JSON 직렬화 가능
            "images": base64_images  # JSON 직렬화 가능
        }), 200

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000, debug=True)