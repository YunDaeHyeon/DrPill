# 공공 데이터 포털에서 제공되는 CSV 파일에 대한 전처리

# 제공되는 CSV 파일의 인코딩 형색 : iso-8859-1
# 인코딩 파일 형식 확인하기 : file -I {확인하고 싶은 파일}
# iso-8859-1 : 서유럽 언어방식
# iso-8859-1를 euc-kr이나 cp949로 복호화한 뒤 다시 디코딩한다.
# iconv -f cp949 -t utf-8 atc_code_before.csv > atc_code_after.csv

# # before : 112,130830ASY,645302132,포크랄시럽(포수클로랄)_(9.5g/95mL),한림제약(주),N05CC01
# after : 112,"130830ASY",645302132,"포크랄시럽(포수클로랄)_(9.5g/95mL)","한림제약(주)","N05CC01"
import os
import csv
import re

# 현재 파이썬 스크립트의 위치를 기반으로 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
input_file = os.path.join(current_dir, '../../resource/atc_code_before.csv')
output_file = os.path.join(current_dir, '../../resource/atc_code_after.csv')

# 정규 표현식 패턴
# 특수문자 (_, (), /, [, ]) 뒤의 모든 데이터를 제거하는 패턴
pattern = r'([^\(\)\[\]_*/]*)'

with open(input_file, mode='r', encoding='utf-8') as infile, \
     open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
    
    reader = csv.reader(infile)
    writer = csv.writer(outfile, delimiter='^')  # 필드 구분자 변경
    
    # 첫 번째 줄을 건너뛰기 위해 사용 (헤더 스킵)
    header = next(reader)
    writer.writerow(header)  # 헤더 그대로 작성

    # 각 줄에 대해
    for row in reader:
        # 특정 필드만 큰따옴표로 감싸기 (이미 큰따옴표가 없는 경우만 추가)
        row[1] = f'"{row[1]}"' if not row[1].startswith('"') else row[1]  # 주성분코드
        row[3] = f'"{row[3]}"' if not row[3].startswith('"') else row[3]  # 제품명
        row[4] = f'"{row[4]}"' if not row[4].startswith('"') else row[4]  # 업체명
        row[5] = f'"{row[5]}"' if not row[5].startswith('"') else row[5]  # ATC코드
        
        # 제품명에서 특수문자(_, (), /) 뒤의 데이터를 제거
        row[3] = re.sub(r'[\(\)\[\]_*/].*$', '', row[3]).strip()  # 괄호, _, / 뒤의 모든 텍스트 제거
        
        # 수정된 행을 출력 파일에 작성
        writer.writerow(row)

print("CSV 파일 처리 완료")

# 트러블 슈팅.
# 아래의 쿼리문을 실행했지만 오류가 지속적으로 발생
# LOAD DATA INFILE '/Users/yundaehyeon/Desktop/WKUProject/BackEnd/medicine-api/resource/atc_code_after.csv'
# INTO TABLE Medicine
# FIELDS TERMINATED BY '^' 
# OPTIONALLY ENCLOSED BY '"' 
# LINES TERMINATED BY '\n'
# IGNORE 1 ROWS
# (medicine_class, mc_code, mid, medicine_name, company_name, atc_code);
# ERROR 1262 (01000): Row 1 was truncated; it contained more data than there were input columns
# 문제의 csv 데이터 일부
# 396,"513700ATB",655500640,"자누메트정50/500밀리그램_(1정)","한국엠에스디(유)","A10BD07"
# 396,"513700ATB",644004800,"자누맥스엠정50/500밀리그램(시타글립틴인산염수화물,메트포르민염산염)_(1정)","삼익제약(주)","A10BD07"
# 쿼리문을 보면 FIELDS TERMINATED BY ','  으로 쉼표(,)를 기준으로 데이터를 분류한다.
# 하지만 "자누맥스엠정50/500밀리그램(시타글립틴인산염수화물,메트포르민염산염)_(1정)" 와 같이 큰따옴표 안에 쉼표가 포함되어있는 데이터가 존재하여
# 데이터베이스에서는 이를 또다른 필드로 인식하여 발생하는 문제이다.
# 따라서 구문자를 쉼표가 아닌 ^으로 변경하여 처리한다.
# 식약분류,주성분코드,제품코드,제품명,업체명,ATC코드
# 396,"520500ATB",641906990,"트루리나엠정2.5/1000mg(리나글립틴,메트포르민염산염)_(1정)","(주)보령","A10BD11"
# 식약분류^주성분코드^제품코드^제품명^업체명^ATC코드
# 396^"520500ATB"^641906990^"트루리나엠정2.5/1000mg(리나글립틴,메트포르민염산염)_(1정)"^"(주)보령"^"A10BD11"

# LOAD DATA LOCAL INFILE '/Users/yundaehyeon/Desktop/WKUProject/BackEnd/medicine-api/resource/atc_code_check.csv'
# INTO TABLE Medicine
# FIELDS TERMINATED BY '^' 
# LINES TERMINATED BY '\n'
# IGNORE 1 ROWS
# (medicine_class, mc_code, mid, medicine_name, company_name, atc_code);

# 파일은 반드시 secure-file-priv 옵션에 명시된 경로에 집어넣기...
# LOAD DATA INFILE '{경로}/atc_code_check.csv'
# INTO TABLE Medicine
# FIELDS TERMINATED BY '^' 
# LINES TERMINATED BY '\n'
# IGNORE 1 ROWS
# (medicine_class, mc_code, mid, medicine_name, company_name, atc_code);

