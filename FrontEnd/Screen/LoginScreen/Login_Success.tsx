<<<<<<< HEAD
import {Alert, ToastAndroid} from 'react-native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import axios from 'axios';

export const Google_PopUp = () => {
  ToastAndroid.showWithGravity(
    '구글 계정으로 로그인 되었습니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Apple_PopUp = () => {
  ToastAndroid.showWithGravity(
    '애플 계정로그인 구현 예정',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Kakao_PopUp = async (): Promise<void> => {
  try {
    // 로그인 시도
    const result = await login();
    console.log('로그인 성공:', result); // 로그인 성공 로그 출력

    // 엑세스 토큰
    const accessToken = result.accessToken;

    // 프로필 정보 가져오기
    const profile = await getProfile();
    console.log('사용자 프로필:', profile); // 사용자 프로필 로그 출력

    // 이메일과 닉네임
    const email = profile.email ? profile.email : '이메일 정보가 없습니다.';
    const nickname = profile.nickname;

    // 모든 정보를 한 번에 출력
    console.log('로그인 정보:', {
      accessToken: accessToken,
      email: email,
      nickname: nickname,
    });

    Alert.alert('로그인 성공', `닉네임: ${nickname}, 이메일: ${email}`);

    // 이메일과 닉네임을 백엔드로 보내기
    const response = await axios.post('https://testurl/login-user', {
      email: email,
      nickname: nickname,
    });

    if (response.status === 200) {
      console.log('서버 응답 성공:', response.data);
    } else {
      console.log('서버 요청 실패:', response.status);
    }
  } catch (error: unknown) {
    console.error('로그인 실패:', error);
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류 발생';
    Alert.alert('로그인 실패', errorMessage);
  }
};

=======
import React, {useEffect} from 'react';
import {View, Button, Alert, ToastAndroid} from 'react-native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import axios from 'axios';

>>>>>>> front/auth
export const Guest_PopUp = () => {
  ToastAndroid.showWithGravity(
    '게스트 계정으로 로그인 되었습니다.\n게스트 계정 이용시 저장이 제한됩니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Kakao_PopUp = async (): Promise<void> => {
  try {
    // 로그인 시도
    const result = await login();
    console.log('로그인 성공:', result); // 로그인 성공 로그 출력

    // 엑세스 토큰
    const accessToken = result.accessToken;

    // 프로필 정보 가져오기
    const profile = await getProfile();
    console.log('사용자 프로필:', profile); // 사용자 프로필 로그 출력

    // 이메일과 닉네임
    const email = profile.email ? profile.email : '이메일 정보가 없습니다.';
    const nickname = profile.nickname;

    // 모든 정보를 한 번에 출력
    console.log('로그인 정보:', {
      accessToken: accessToken,
      email: email,
      nickname: nickname,
    });

    // 이메일과 닉네임을 백엔드로 보내기
    const response = await axios.post(
      'http://192.168.37.235:3000/create-user',
      {
        email,
        nickname,
      },
    );

    switch (response.status) {
      case 200:
        console.log('서버 응답 성공 (200):', response.data);
        Alert.alert('성공', '요청이 성공적으로 처리되었습니다.');
        break;

      case 201:
        console.log(
          '서버 응답 성공 (201): 리소스가 생성되었습니다.',
          response.data,
        );
        Alert.alert('성공', '리소스가 성공적으로 생성되었습니다.');
        break;

      default:
        console.error('서버 요청 실패:', response.status, response.data);
        Alert.alert('서버 오류', `서버 요청 실패: ${response.status}`);
        break;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 서버가 응답을 주었지만 실패한 경우
        console.error('응답 에러 메시지:', error.response.data);
        Alert.alert('서버 오류', '서버에서 오류가 발생했습니다.');
      } else if (error.request) {
        // 요청이 전송되었으나 응답을 받지 못한 경우
        console.error('요청 에러:', error.request);
        Alert.alert('네트워크 오류', '서버로부터 응답을 받지 못했습니다.');
      } else {
        // 요청 설정 자체에서 발생한 오류
        console.error('요청 설정 에러:', error.message);
        Alert.alert('설정 오류', '요청 설정에 문제가 있습니다.');
      }
    } else {
      console.error('기타 에러:', error);
      Alert.alert('알 수 없는 오류', '알 수 없는 문제가 발생했습니다.');
    }

    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류 발생';
    Alert.alert('로그인 실패', errorMessage);
  }
};
