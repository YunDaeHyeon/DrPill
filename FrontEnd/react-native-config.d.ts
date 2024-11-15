// react-native-config.d.ts
declare module 'react-native-config' {
  interface Env {
    AUTH_SERVER_URL: string; // AUTH_SERVER_URL 타입 정의 추가
    KAKAO_APP_KEY : string; // KAKAO_APP_KEY 타입 정의 
  }

  const Config: Env;
  export default Config;
}
