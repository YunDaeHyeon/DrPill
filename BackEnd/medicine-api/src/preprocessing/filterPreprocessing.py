# 잘못된 구문자 혹은 데이터 필드 내에 잘못된 데이터가 있는 경우 캐치
import os
import csv

# 현재 파이썬 스크립트의 위치를 기반으로 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
input_file = os.path.join(current_dir, '../../resource/atc_code_after.csv')
output_file = os.path.join(current_dir, '../../resource/atc_code_check.csv')

with open(input_file, mode='r', encoding='utf-8') as infile, \
     open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
    reader = csv.reader(infile, delimiter='^', quotechar='"')
    writer = csv.writer(outfile, delimiter='^', quotechar='"')

    # 첫 번째 줄을 건너뛰기
    header = next(reader)
    writer.writerow(header)

    for row in reader:
        if len(row) != 6:  # 예를 들어, 6개 필드가 아닌 경우
            print(f"잘못된 행: {row}")
            continue  # 잘못된 행을 건너뛰기
        writer.writerow(row)
        
print("CSV 파일 처리 완료")