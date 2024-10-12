import os
import numpy as np
import cv2
import pytesseract

# 객체 검출 모델
from inference_sdk import InferenceHTTPClient
# 환경변수
from dotenv import load_dotenv
# 이미지
from PIL import Image

# (테스트) 이미지 색상 검출 라이브러리 활용
from colorthief import ColorThief
import matplotlib.pyplot as plt
import colorsys

# 환경변수 로드
load_dotenv()

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("API_KEY")
)

path = "./test_img2.jpg"
result = CLIENT.infer(path, model_id="wku-drug-detection/3")

# result에 'predicitions' 필드가 있는지, 그 값이 존재하는지 확인한다.
if 'predictions' in result and isinstance(result['predictions'], list):
    predictions = result['predictions']

    # 이미지 열기
    image = Image.open(path)

    # 모델에서 넘어온 객체 감지 결과값 파싱 후 리스트에 저장
    detections = []
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

        # 잘라낸 이미지를 새로운 파일로 저장
        # label = 객체의 클래스, idx = 검출된 각 객체에 대한 고유한 번호 (사진이 중복되지 않기 위함)
        cropped_img.save(f"./cropped_{label}_{idx}.jpg")

        # 이미지의 주요 색상을 추출하여 시각화
        ct = ColorThief(f"./cropped_{label}_{idx}.jpg")
        dominant_color = ct.get_color(quality=1)

        plt.imshow([[dominant_color]])
        plt.show()

        # 모양을 추출하기 위해선 cv를 사용해야하기 위해 이미지를 numpy 배열로 변환
        # cropped_img_np = np.array(cropped_img)

        # # 약 모양, 색상, 글자 추출 후 출력
        # shape = extract_shape(cropped_img_np) # numpy 배열로 전송
        # color = extract_color(cropped_img)
        # text = extract_text(cropped_img)
        # print(f"cropped_{label}_{idx}의 모양: {shape}")
        # print(f"cropped_{label}_{idx}의 색상: {color}")
        # print(f"cropped_{label}_{idx}의 글자: {text}")
    
    # 감지된 객체 출력
    if not detections:
        print("감지된 약이 없습니다.")
    else:
        print(detections)
else:
    print("알 수 없는 오류 발생. (predictions 값이 존재하지 않습니다.)")


# # 약 모양 매핑
# def classify_shape(contour):
#     perimeter = cv2.arcLength(contour, True)
#     approx = cv2.approxPolyDP(contour, 0.04 * perimeter, True)
#     num_sides = len(approx)

#     print(f"약 모양 검출 값 : {num_sides}")

#     if num_sides == 3:
#         return "삼각형"
#     elif num_sides == 4:
#         aspect_ratio = float(cv2.boundingRect(contour)[2]) / cv2.boundingRect(contour)[3]
#         if 0.95 < aspect_ratio < 1.05:
#             return "원형"
#         else:
#             return "장방형"
#     elif num_sides == 5:
#         return "오각형"
#     elif num_sides == 6:
#         return "육각형"
#     elif num_sides == 8:
#         return "팔각형"
#     else:
#         area = cv2.contourArea(contour)
#         circularity = 4 * np.pi * (area / (perimeter ** 2))
#         if circularity > 0.8:
#             return "원형"
#         else:
#             return "타원형"

# # 약 색상 매핑
# def classify_color(rgb_color):
#     r, g, b = rgb_color
#     print(f"색상 추출 값 r : {r}, g : {g}, b : {b}")
#     colors = []

#     # 하양
#     if r > 200 and g > 200 and b > 200:
#         colors.append("하양")
#     # 노랑
#     elif r > 200 and g > 150 and b > 50:
#         colors.append("노랑")
#     # 주황
#     elif r > 200 and g > 100 and b < 100:
#         colors.append("주황")
#     # 분홍
#     elif r > 200 and g < 150 and b > 200:
#         colors.append("분홍")
#     # 빨강
#     elif r > 200 and g < 50 and b < 50:
#         colors.append("빨강")
#     # 갈색
#     elif r < 150 and g < 100 and b < 50:
#         colors.append("갈색")
#     # 연두
#     elif r < 100 and g > 200 and b < 100:
#         colors.append("연두")
#     # 초록
#     elif r < 100 and g > 100 and b < 100:
#         colors.append("초록")
#     # 청록
#     elif r < 100 and g > 150 and b > 150:
#         colors.append("청록")
#     # 파랑
#     elif r < 50 and g < 100 and b > 200:
#         colors.append("파랑")
#     # 남색
#     elif r < 50 and g < 50 and b > 150:
#         colors.append("남색")
#     # 자주
#     elif r < 100 and g < 50 and b > 100:
#         colors.append("자주")
#     # 회색
#     elif r < 150 and g < 150 and b < 150:
#         colors.append("회색")
#     # 검정
#     elif r < 50 and g < 50 and b < 50:
#         colors.append("검정")
#     # 투명
#     elif (r == 0 and g == 0 and b == 0):
#         colors.append("투명")

#     # 색상이 없으면 "해당 약의 색상을 알 수 없습니다." 출력
#     return colors if colors else ["해당 약의 색상을 알 수 없습니다."]

# # 약 글자 추출을 위한 이미지 전처리
# def preprocess_image_for_ocr(img):
#     # 그레이스케일 변환
#     gray = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
#     # 노이즈 제거를 위해 블러 처리 진행
#     blur = cv2.GaussianBlur(gray, (5, 5), 0)
#     # 이진화 처리로 글자 대비를 증가
#     _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
#     return Image.fromarray(thresh)

# # 약 모양 추출
# def extract_shape(image_np):
#     # 그레이스케일 변환
#     gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
    
#     # 이진화 처리 (경계 추출)
#     # threshold에서 반환되는 값 중 첫 번째 변수는 무시한다.
#     _, threshold = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

#     # 윤곽선 찾기
#     contours, _ = cv2.findContours(threshold, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
#     if contours:
#         # 가장 큰 윤곽선이 약의 모양일 가능성이 크다.
#         largest_contour = max(contours, key=cv2.contourArea)
#         # 윤곽선 면적 반환 (매핑 함수 호출)
#         return classify_shape(largest_contour)
#     return None

# # 약 색상 추출
# def extract_color(image):
#     # 이미지를 npmby 배열로 전환
#     image_np = np.array(image)

#     # 이미지의 평균 색상 계산
#     mean_color = cv2.mean(image_np)[:3] # BGR 값 반환

#     # RGB 변환
#     rgb_color = (mean_color[2], mean_color[1], mean_color[0])

#     # 색상 분류
#     colors = classify_color(rgb_color)

#     # 캡슐형 약과 같이 색상이 2개 이상인 경우
#     if len(colors) > 1:
#         return ", ".join(colors) # 두 가지 색상을 연결하여 반환
#     else:
#         return colors[0] # 한 가지 색상 반환

# # 약에 새겨진 글자 추출 (OCR)
# def extract_text(image):
#     # 이미지 전처리
#     processed_image = preprocess_image_for_ocr(image)

#     # OCR
#     text = pytesseract.image_to_string(processed_image)

#     print(f"추출된 글자 : {text}")

#     return text