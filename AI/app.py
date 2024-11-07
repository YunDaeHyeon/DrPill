import cv2, os
from flask import Flask, request, jsonify
from io import BytesIO
import base64
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
    # result에 'predicitions' 필드가 있는지, 그 값이 존재하는지 확인한다.
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

            # 잘라낸 이미지를 base64로 인코딩
            img_byte_io = BytesIO()
            cropped_img.save(img_byte_io, format='JPEG')
            img_byte_io.seek(0)

            # 잘라낸 이미지를 새로운 파일로 저장
            # label = 객체의 클래스, idx = 검출된 각 객체에 대한 고유한 번호 (사진이 중복되지 않기 위함)
            # cropped_img.save(f"./cropped_{label}_{idx}.jpg")

            # 전달을 위해 인코딩 변환
            img_base64 = base64.b64encode(img_byte_io.getvalue()).decode('utf-8')

            # 이미지를 리스트에 추가
            base64_images.append({
                "label": label,
                "image": img_base64,
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
        jsonify({"message": "이미지를 처리하는 중 오류가 발생하였습니다."}), 500




if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000, debug=True)