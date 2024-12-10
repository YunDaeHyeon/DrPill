import os
import io
import numpy as np
import cv2
import matplotlib.pyplot as plt
from google.cloud import vision

# Google Cloud Vision 설정
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './drpill-444115-7bcbddc32456.json'
client = vision.ImageAnnotatorClient()

# plt_imshow 함수 정의
def plt_imshow(title='image', img=None, figsize=(8, 5)):
    plt.figure(figsize=figsize)
    if isinstance(img, list):
        titles = title if isinstance(title, list) else [title] * len(img)
        for i in range(len(img)):
            rgb_img = cv2.cvtColor(img[i], cv2.COLOR_BGR2RGB) if len(img[i].shape) == 3 else img[i]
            plt.subplot(1, len(img), i + 1)
            plt.imshow(rgb_img)
            plt.title(titles[i])
            plt.xticks([]), plt.yticks([])
    else:
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) if len(img.shape) == 3 else img
        plt.imshow(rgb_img)
        plt.title(title)
        plt.xticks([]), plt.yticks([])
    plt.show()

# 모양 감지 함수
def detect_shape(contour):
    peri = cv2.arcLength(contour, True)
    approx = cv2.approxPolyDP(contour, 0.02 * peri, True)  # 허용 오차를 줄임

    # 모양 판별
    if len(approx) == 3:
        return "Triangle"
    elif len(approx) == 4:
        x, y, w, h = cv2.boundingRect(approx)
        aspect_ratio = w / float(h)
        return "Square" if 0.95 <= aspect_ratio <= 1.05 else "Rectangle"
    elif len(approx) > 4:
        area = cv2.contourArea(contour)
        (x, y), radius = cv2.minEnclosingCircle(contour)
        circle_area = np.pi * (radius ** 2)
        if 0.85 <= area / circle_area <= 1.15:
            return "Circle"
        else:
            return "Ellipse"
    return "Unknown"

# 주요 컨투어 필터링 함수
def filter_contours(contours, min_area=1000):
    filtered = []
    for contour in contours:
        if cv2.contourArea(contour) >= min_area:  # 최소 면적 기준 필터링
            filtered.append(contour)
    return filtered

# 이미지 경로 및 데이터 읽기
path = './gray_background_cropped_2.png'
with io.open(path, 'rb') as image_file:
    content = image_file.read()

image = vision.Image(content=content)

# Vision API: Object Localization 호출
object_response = client.object_localization(image=image)
localized_objects = object_response.localized_object_annotations

# OpenCV로 이미지 읽기
img = cv2.imread(path)
roi_img = img.copy()

# 감지된 객체 확인
print("\n[모양 추출]")
h, w, _ = img.shape


# Vision API로 감지된 객체 처리
if not localized_objects:
    print("Vision API로 감지된 객체가 없습니다.")
else:
    for obj in localized_objects:
        print(f"객체 라벨 (Vision API): {obj.name}, 신뢰도: {obj.score:.2f}")
        vertices = obj.bounding_poly.normalized_vertices
        x1, y1 = int(vertices[0].x * w), int(vertices[0].y * h)
        x2, y2 = int(vertices[2].x * w), int(vertices[2].y * h)

        # ROI 추출
        if x1 >= x2 or y1 >= y2:
            print("잘못된 ROI 좌표로 인해 ROI를 추출할 수 없습니다.")
            continue

        roi = img[y1:y2, x1:x2]

        # ROI 디버깅
        plt_imshow("ROI", roi)

        # 명암비 조정 (히스토그램 평활화)
        gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
        equalized = cv2.equalizeHist(gray)

        # 블러링 및 이진화
        blurred = cv2.GaussianBlur(equalized, (9, 9), 0)
        thresh = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
        )

        # 이진화 결과 디버깅
        plt_imshow("Thresholded ROI", thresh)

        # 컨투어 검출
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # 컨투어 디버깅
        print(f"검출된 컨투어 개수: {len(contours)}")

        # 컨투어 필터링
        filtered_contours = filter_contours(contours, min_area=2000)
        print(f"필터링된 컨투어 개수: {len(filtered_contours)}")

        # 주요 컨투어의 모양 감지
        detected_shapes = []
        for contour in filtered_contours:
            shape = detect_shape(contour)
            detected_shapes.append(shape)

            # 주요 외곽선을 그리기
            cv2.drawContours(roi, [contour], -1, (0, 255, 0), 3)
            # 모양 이름 표시
            M = cv2.moments(contour)
            if M["m00"] != 0:
                cX = int(M["m10"] / M["m00"])
                cY = int(M["m01"] / M["m00"])
                cv2.putText(roi, shape, (cX - 50, cY), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # 주요 모양 출력
        if detected_shapes:
            print(f"감지된 주요 모양: {', '.join(detected_shapes)}")
        else:
            print("컨투어에서 감지된 모양이 없습니다.")

        # 결과 표시
        plt_imshow(f"Detected Shape: {obj.name}", roi)