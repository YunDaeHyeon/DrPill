import os
# index.py
from inference_sdk import InferenceHTTPClient
# 환경변수
from dotenv import load_dotenv
# 이미지
from PIL import Image

# 환경변수 로드
load_dotenv()

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("API_KEY")
)

path = "./IMG_5311.jpg"
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
    
    # 감지된 객체 출력
    if not detections:
        print("감지된 약이 없습니다.")
    else:
        print(detections)
else:
    print("알 수 없는 오류 발생. (predictions 값이 존재하지 않습니다.)")