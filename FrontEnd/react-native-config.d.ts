// react-native-config.d.ts
declare module 'react-native-config' {
  interface Env {
    React_APP_API_KEY: string;
    AUTH_SERVER_URL: string; // AUTH_SERVER_URL 타입 정의 추가
    MEDICINE_SERVER_URL: string; //Medicine 요청 주소 타입 정의 추가
  }

  const Config: Env;
  export default Config;
}