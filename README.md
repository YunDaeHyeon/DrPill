## 💊 약선생(DrPill)

<p align="center">
  <img src="https://github.com/user-attachments/assets/d35dd4c1-6748-47f0-8c31-7274162e034b" width="300" height="300"/>
</p>

> **원광대학교 기업연계프로젝트1 약제자들**  
> 개발기간 : 2024.09 ~ 2024.11
>
> - 원광대학교 2024 공학교육원 캡스톤디자인 경진대회 대상
> - 원광대학교 2024 컴공인의날 최우수상
> - 원광대학교 2024 소프트웨어 아이디어 경진대회 우수상

## 🙋 팀원 소개

<p align="center">

|   <img src="https://avatars.githubusercontent.com/u/62231651?v=4" width="150" height="150"/>   | <img src="https://avatars.githubusercontent.com/u/89891115?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/82390197?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/103913165?v=4" width="150" height="150"/> |
| :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|                Daehyeon Yun<br/>[@YunDaeHyeon](https://github.com/YunDaeHyeon)                 |                YoungJae01<br/>[@YoungJae01](https://github.com/YoungJae01)                 |                     봉가은<br/>[@pongaun](https://github.com/pongaun)                      |                     김혜진<br/>[@hyejin27](https://github.com/hyejin27)                     |
| <b>팀장</b><br/><b>프로젝트 총괄</b><br/><b>프론트엔드</b><br/><b>백엔드</b><br/><b>OpenCV</b> |                   <b>팀원</b><br/><b>프론트엔드</b><br/><b>인증처리</b>                    |                      <b>팀원</b><br/><b>백엔드</b><br/><b>디자인</b>                       |                     <b>팀원</b><br/><b>프론트엔드</b><br/><b>UI/UX</b>                      |

</p>

## 📦 프로젝트 소개

> **약물 오남용 방지 및 안전한 약 복용을 위한 개인 맞춤형 서비스**

약선생(Dr.Pill)은 증가하는 약물 복용량과 복잡한 약물 상호작용으로 인한 다양한 문제점을 해결하고자 스마트폰 카메라를 활용한 약물 인식 기능, 음성 인터페이스 기반의 사용자 친화적인 설계, 맞춤형 약물 관리 기능 및 검색 기능을 갖춘 어플리케이션입니다.

## 📦 결과물

<p align="center">
  <img src="https://github.com/user-attachments/assets/00969b69-bd20-417f-b531-f32c45e87e84"/>
</p>

## 💻 시연 영상

[시연 영상 링크](https://drive.google.com/file/d/1ESfQIG-B5YsEkwGHWr4AoXe8QU4hWgoH/view?usp=sharing)

<p align="center">
  <img src="./result_video.gif" width="300" alt="로컬 GIF 예제">
</p>

## 📦 프로젝트 설치 및 실행 가이드

> **권장 Node.js 버전 : Node 18 이상**  
> **권장 Python 버전 : Python 3.10 이상**  
> **환경변수 : 프론트엔드, 백엔드, AI 모두 .env 파일로 관리**  
> **데이터베이스 : MySQL 사용 (mysql2 패키지)**

### 📌 Frontend (React Native)

```bash
# 프로젝트 클론 및 디렉터리 이동
git clone https://github.com/YunDaeHyeon/DrPill.git
cd FrontEnd

# 패키지 설치
npm install

# 프로젝트 실행 (Android)
npx react-native run-android

# 프로젝트 실행 (iOS)
npx react-native run-ios

# 개발 서버 실행
npx react-native start
```

### 📌 BackEnd (NestJS)

```bash
# 프로젝트 클론 및 디렉터리 이동
git clone https://github.com/YunDaeHyeon/DrPill.git
cd BackEnd/medicine-api

# 패키지 설치
npm install


# 데이터베이스 마이그레이션 (MySQL 기반)
npm run typeorm migration:run

# 개발 모드 실행
npm run start:dev

# 프로덕션 실행 (PM2 사용)
npm run build
npm run start:prod
```

### 📌 AI (Python + OpenCV + Flask)

```bash
# 프로젝트 클론 및 디렉터리 이동
git clone https://github.com/YunDaeHyeon/DrPill.git
cd AI

# 가상환경 생성
python -m venv env
source env/bin/activate  # Mac/Linux
# env\Scripts\activate   # Windows

# 패키지 설치
pip install -r requirements.txt

# AI 서버 실행 (Flask 기준)
python app.py
```

## 📦 기술 스택

<p align="center">
  <img src="https://github.com/user-attachments/assets/c428c871-4c28-4c2d-9f9d-c958cf672150"/>
</p>

## 📦 NestJS 및 Flask API 명세

[📌 NestJS API 명세서](https://daegom.notion.site/Drpill-NestJS-API-1481833ac003802f920acbe0081c5c0e)

[📌 AI + Flask API 명세서](https://daegom.notion.site/Drpill-Flask-API-1751833ac00380bcb2f3cd91c742367f)

## 📦 주요 기능

### ⭐️ 다양한 일반, 전문의약품 검색 가능

- 초기에 설정한 관심질환을 기반하여 일반 및 전문의약품 리스트를 제공
- 질환, 제품명, 개발회사 등 다양한 정보를 이용하여 의약품 검색 가능

### ⭐️ 관심있는 의약품 관리

- 관심있는 의약품들을 즐겨찾기하여 별도로 관리 가능
- 추후 좀 더 다양한 의약품 관리 기능 추가 예정

### ⭐️ 의약품 정보 요약 및 음성 데이터 제공

- 설정에서 음성 데이터 제공 기능 활성화 시 의약품의 필수 정보 요약 및 음성 데이터를 제공

### ⭐️ 원하는 의약품을 촬영 시 해당 의약품에 대한 정보 제공

- 낱알 혹은 캡슐을 촬영하면 최대 4개까지 가장 유사한 의약품을 검색하여 제공
- 추후 지속적인 정확도 개선 예정

## 📦 아키텍쳐

### 📌 프로젝트 아키텍쳐

<p align="center">

<img src="https://github.com/user-attachments/assets/5496f26e-8bdb-48e1-a146-20812dd1cd16" />
</p>

### 📌 프로젝트 디렉터리 구조

```bash
Drpill
├── AI
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   ├── app.py
│   ├── requirements.txt
│   ├── test.json
│   └── test.py
├── BackEnd
│   └── medicine-api
│       ├── .env
│       ├── .eslintrc.js
│       ├── .gitignore
│       ├── .prettierrc
│       ├── README.md
│       ├── filterPreprocessing.py
│       ├── nest-cli.json
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       │   ├── app.controller.spec.ts
│       │   ├── app.controller.ts
│       │   ├── app.module.ts
│       │   ├── app.service.ts
│       │   ├── dto
│       │   │   ├── create-medicine.dto.ts
│       │   │   └── create-user.dto.ts
│       │   ├── entities
│       │   │   ├── medicine.entity.ts
│       │   │   ├── pill.entity.ts
│       │   │   ├── user.entity.ts
│       │   │   └── userMedicine.entity.ts
│       │   ├── main.ts
│       │   ├── preprocessing
│       │   │   └── csvPreprocessing.py
│       │   └── swagger.document.ts
│       ├── test
│       │   ├── app.e2e-spec.ts
│       │   └── jest-e2e.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── FrontEnd
│   ├── .env
│   ├── .DS_Store
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierrc.js
│   ├── .watchmanconfig
│   ├── App.tsx
│   ├── Function
│   │   ├── CustomText.tsx
│   │   ├── EditImageModal.tsx
│   │   ├── InfoModal.tsx
│   │   ├── Like.tsx
│   │   ├── ListLike.tsx
│   │   ├── MainListContext.tsx
│   │   ├── Navigation.tsx
│   │   ├── VoiceProvider.tsx
│   │   ├── chatgpt.ts
│   │   ├── globalStyle.ts
│   │   └── interests_disease.ts
│   ├── android
│   ├── ios
│   ├── Image
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── README.md
│   ├── Screen
│   │   ├── AppLoad.tsx
│   │   ├── Camera
│   │   │   ├── CameraCapture.tsx
│   │   │   ├── CameraModal.tsx
│   │   │   ├── DetectedImage.tsx
│   │   │   ├── Find_Medicine.tsx
│   │   │   ├── Gallery.tsx
│   │   │   └── Medicine_Check.tsx
│   │   ├── Commonness
│   │   │   └── NavigationBar.tsx
│   │   ├── LoginScreen
│   │   │   ├── Disease_Data.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Login_Success.tsx
│   │   │   └── UserInfoPage.tsx
│   │   ├── MainScreen
│   │   │   ├── Main.tsx
│   │   │   ├── MedicineInfo.tsx
│   │   │   └── MedicineList.tsx
│   │   ├── Medicinie_Library
│   │   │   └── Pill_Library.tsx
│   │   └── MyPage
│   │       ├── LogoutDeleteScreen.tsx
│   │       ├── MyPage.tsx
│   │       ├── Profile_Edit.tsx
│   │       └── audiotts.tsx
│   ├── app.json
│   ├── assets
│   │   └── fonts
│   │       └── Jua-Regular.ttf
│   ├── babel.config.js
│   ├── index.js
│   ├── initializeTtsListeners.tsx
│   ├── jest.config.js
│   ├── metro.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── react-native-config.d.ts
│   ├── react-native.config.js
│   └── tsconfig.json
├── README.md
├── package-lock.json
├── package.json
└── result_video.gif

# 프로젝트 주요 파일만 표시하였음.
```

## 😄 팀원 소감

<p align="center">

<table style="table-layout: fixed; width: 100%;">
  <tr>
    <td align="center" style="width: 200px; height: 200px;">
      <img src="https://avatars.githubusercontent.com/u/62231651?v=4" width="150" height="150"/>
      <br/>
      <strong>Daehyeon Yun</strong><br/>
      <a href="https://github.com/YunDaeHyeon">@YunDaeHyeon</a>
    </td>
    <td align="center" style="width: 200px; height: 200px;">
      <img src="https://avatars.githubusercontent.com/u/89891115?v=4" width="150" height="150"/>
      <br/>
      <strong>YoungJae01</strong><br/>
      <a href="https://github.com/YoungJae01">@YoungJae01</a>
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 200px; height: 100px; padding: 10px; vertical-align: top;">
      군 전역 후 오랜만에 진행하는 팀 프로젝트이다 보니, 팀 운영과 진행에 있어 미숙함과 서투름이 다소 존재했던 것 같아요. 전반적인 프로젝트 관리와 팀원들의 일정 조율 등 평소 개발만 진행하다가 직접 PM 역할까지 병행해서 진행하니 역시 어렵다고 생각이 들었지만, 막상 뒤돌아보면 이 역시 성장할 수 있었던 계기로 작용한 것 같습니다. 실제 서비스 런칭을 위해 고려해야 할 법적, 물리적 요소들을 다시 한번 떠올리게 되었습니다. 올바른 협업이란 무엇인가라는 질문을 끊임없이 던지며 스스로의 기술 스택을 다시 한번 점검하는 시간이었습니다. 감사합니다.
    </td>
    <td align="center" style="width: 200px; height: 100px; padding: 10px; vertical-align: top;">
      처음으로 React Native를 다루고, 협업을 경험하면서 카카오와 게스트 로그인, 그리고 회원가입 로직 개발을 맡아 진행했습니다. 초기에는 Context API와 Redux를 사용해 데이터를 관리할 계획이었지만, 본인의 기술적 한계와 시간 부족으로 인해 Async Storage를 활용하여 로그인부터 회원가입까지의 기능을 완성할 수 있었습니다. 협업을 처음 경험하다 보니 서투르거나 아쉬운 점도 많았지만, 그 과정에서 Git을 다루는 방법과 효과적으로 협업을 진행하는 법 등을 배우며 성취감과 즐거움을 느낄 수 있었습니다. 다음에는 더 다양한 기술, 예를 들어 이번에 사용하지 못한 Context API나 Redux를 도입하거나, 더 많은 역할을 맡아 발전된 방식으로 프로젝트를 진행해보고 싶습니다. 재미있었습니다!!
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 200px; height: 200px;">
      <img src="https://avatars.githubusercontent.com/u/82390197?v=4" width="150" height="150"/>
      <br/>
      <strong>봉가은</strong><br/>
      <a href="https://github.com/pongaun">@pongaun</a>
    </td>
    <td align="center" style="width: 200px; height: 200px;">
      <img src="https://avatars.githubusercontent.com/u/103913165?v=4" width="150" height="150"/>
      <br/>
      <strong>김혜진</strong><br/>
      <a href="https://github.com/hyejin27">@hyejin27</a>
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 200px; height: 100px; padding: 10px; vertical-align: top;">
      -
    </td>
    <td align="center" style="width: 200px; height: 100px; padding: 10px; vertical-align: top;">
      새로운 프로그램을 사용하면서 낯섦이 있었지만 검색과 여러 도움을 통해 한정된 시간이었는데도 지식을 많이 얻었습니다. 큰 프로젝트가 처음인데도 불구하고 원활하게 완성할 수 있었던 건 팀원들의 도움이 있었기 때문인 거 같습니다. 또한 프로젝트 하는 동안 프론트엔드와 협력 개발에 대한 경험도 쌓을 수 있어 좋은 시간이었습니다. 
    </td>
  </tr>
</table>
</p>
