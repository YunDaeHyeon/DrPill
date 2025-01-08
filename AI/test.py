import os
import numpy as np
import cv2
import math
from rembg import remove
from inference_sdk import InferenceHTTPClient
from dotenv import load_dotenv
from PIL import Image
from google.cloud import vision

# 환경변수 로드
load_dotenv()

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("API_KEY")
)

path = "./test_img1.jpg"
result = CLIENT.infer(path, model_id="wku-drug-detection/3")

# Google Cloud Vision 설정
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service-account-file.json'
client = vision.ImageAnnotatorClient()

# Google Vision 텍스트 추출
with io.open(path, 'rb') as image_file:
    content = image_file.read()

vision_image = vision.Image(content=content)
response = client.text_detection(image=vision_image)
texts = response.text_annotations

# HSV 범위 기반 색상 매핑
COLOR_RANGES = {
    "Red": [(0, 50, 50), (10, 255, 255)],
    "Orange": [(11, 50, 50), (25, 255, 255)],
    "Yellow": [(26, 50, 50), (35, 255, 255)],
    "Light Green": [(36, 50, 50), (70, 255, 255)],
    "Green": [(71, 50, 50), (85, 255, 255)],
    "Blue": [(86, 50, 50), (130, 255, 255)],
    "Purple": [(131, 50, 50), (160, 255, 255)],
    "White": [(0, 0, 200), (180, 20, 255)],
    "Black": [(0, 0, 0), (180, 255, 50)]
}

# HSV 범위를 기반으로 색상 선택
def select_color_by_hsv(image, mask=None):
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    if mask is not None:
        hsv_image = cv2.bitwise_and(hsv_image, hsv_image, mask=mask)

    # 픽셀마다 색상 범위를 확인
    pixels = hsv_image.reshape(-1, 3)
    color_counts = {color: 0 for color in COLOR_RANGES.keys()}
    for pixel in pixels:
        for color_name, (lower, upper) in COLOR_RANGES.items():
            if all(lower[i] <= pixel[i] <= upper[i] for i in range(3)):
                color_counts[color_name] += 1
                break

    # 가장 많은 픽셀 수를 가진 색상 반환
    sorted_colors = sorted(color_counts.items(), key=lambda x: x[1], reverse=True)
    return sorted_colors[0][0] if sorted_colors[0][1] > 0 else "Unknown"

# 약 모양 감지
def detect_shape(image, mask=None, visualize=False):
    image_copy = image.copy()
    imgray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    if mask is not None:
        imgray = cv2.bitwise_and(imgray, imgray, mask=mask)
    blur = cv2.GaussianBlur(imgray, (5, 5), 0)
    _, thr = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thr, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for cont in contours:
        if cv2.contourArea(cont) < 500:
            continue
        epsilon = 0.02 * cv2.arcLength(cont, True)
        approx = cv2.approxPolyDP(cont, epsilon, True)
        vertex_count = len(approx)
        x, y, w, h = cv2.boundingRect(approx)
        aspect_ratio = w / float(h)

        label = (
            "Circle" if vertex_count >= 8 and 0.9 <= aspect_ratio <= 1.1 else
            "Ellipse" if vertex_count >= 8 else
            "Rectangle" if vertex_count == 4 and aspect_ratio > 1.05 else
            "Square" if vertex_count == 4 else
            "Other"
        )

        if visualize:
            cv2.drawContours(image_copy, [approx], -1, (0, 255, 0), 2)
            mmt = cv2.moments(cont)
            if mmt['m00'] != 0:
                cx = int(mmt['m10'] / mmt['m00'])
                cy = int(mmt['m01'] / mmt['m00'])
                cv2.putText(image_copy, label, (cx, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

        return label, image_copy

    return "Unknown", image_copy

# 객체 검출 및 시각화
if 'predictions' in result and isinstance(result['predictions'], list):
    predictions = result['predictions']
    image = Image.open(path)
    full_image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    for idx, prediction in enumerate(predictions):
        x_center = prediction['x']
        y_center = prediction['y']
        width = prediction['width']
        height = prediction['height']

        top_left_x = int(x_center - (width / 2))
        top_left_y = int(y_center - (height / 2))
        bottom_right_x = int(x_center + (width / 2))
        bottom_right_y = int(y_center + (height / 2))

        cropped_img = image.crop((top_left_x, top_left_y, bottom_right_x, bottom_right_y))
        background_crop_img = remove(np.array(cropped_img))
        background_crop_img = Image.fromarray(background_crop_img)

        rgba_image = np.array(background_crop_img)
        alpha_channel = rgba_image[:, :, 3]
        mask = alpha_channel > 0
        background_cropped_img_cv = cv2.cvtColor(np.array(background_crop_img.convert('RGB')), cv2.COLOR_RGB2BGR)

        # HSV 범위 기반 색상 분석
        color_name = select_color_by_hsv(background_cropped_img_cv, mask.astype(np.uint8) * 255)

        # 모양 분석
        shape, visualization = detect_shape(background_cropped_img_cv, mask.astype(np.uint8) * 255, visualize=True)
        cv2.imwrite(f"visualized_shape_{idx}.png", visualization)

        print(f"Object {idx}:")
        print(f"  - Shape: {shape}")
        print(f"  - Color: {color_name}")
        print("-" * 30)

    cv2.imshow("Full Image Visualization", full_image_cv)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
else:
    print("No objects detected.")
