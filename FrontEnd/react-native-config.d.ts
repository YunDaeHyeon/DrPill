// react-native-config.d.ts
declare module 'react-native-config' {
  interface Env {
    REACT_APP_SERVICE_KEY: string;
    React_APP_API_KEY: string;
    AUTH_SERVER_URL: string; // AUTH_SERVER_URL 타입 정의 추가
    KAKAO_APP_KEY: string; // KAKAO_APP_KEY 타입 정의
    MEDICINE_SERVER_URL: string; //Medicine 요청 주소 타입 정의 추가
    DRPILL_CHATGPT: string;
  }

  const Config: Env;
  export default Config;
}
