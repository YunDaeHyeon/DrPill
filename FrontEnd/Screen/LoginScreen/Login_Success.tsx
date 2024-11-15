import React from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import axios from 'axios';

// AsyncStorage 초기화 함수
const resetUserData = async () => {
  await AsyncStorage.removeItem('nickname');
  await AsyncStorage.removeItem('profileImage');
};

const showToast = message => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Guest_PopUp = async (): Promise<void> => {
  const guestProfile = {
    nickname: 'GUEST', // 게스트 기본 닉네임
    email: '이메일 없음', // 이메일 없음 처리
    profileImage: '../../Image/사람_프로필.png', // 기본 프로필 이미지
  };

  try {
    // 데이터를 AsyncStorage에 저장
    await AsyncStorage.setItem('userProfile', JSON.stringify(guestProfile));

    ToastAndroid.showWithGravity(
      '게스트 계정으로 로그인 되었습니다.\n게스트 계정 이용 시 저장이 제한됩니다.',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  } catch (error) {
    console.error('게스트 로그인 데이터 저장 실패:', error);
  }
};


export const Kakao_PopUp = async (): Promise<boolean> => {
  try {
    const result = await login();
    console.log('로그인 로그:', result);

    const profile = await getProfile();
    console.log('카카오 프로필 데이터:', profile);

    const nickname = profile.nickname || '닉네임 없음';
    const email = profile.email || '이메일 없음';
    const profileImage = profile.profileImageUrl || '../../Image/사람_프로필.png';

    // 데이터를 AsyncStorage에 저장
    await AsyncStorage.setItem(
      'userProfile',
      JSON.stringify({ nickname, email, profileImage }),
    );

    // 서버로 데이터 전송
    const response = await axios.post(`${Config.AUTH_SERVER_URL}/create-user`, {
      email,
      nickname,
    });

    if (response.status === 200 || response.status === 201) {
      showToast('카카오 로그인 성공');
      return true; // 성공 시 true 반환
    } else {
      console.error(`서버 응답 실패: ${response.status}`);
      showToast('서버와의 통신에 문제가 발생했습니다.');
      return false; // 실패 시 false 반환
    }
  } catch (error) {
    console.error('로그인 실패 또는 네트워크 오류:', error);
    showToast('로그인에 실패했습니다. 다시 시도해주세요.');
    return false; // 실패 시 false 반환
  }
};

