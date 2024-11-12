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
  showToast(
    '게스트 계정으로 로그인 되었습니다.\n게스트 계정 이용 시 저장이 제한됩니다.',
  );
  await AsyncStorage.setItem('nickname', 'GUEST');
  await AsyncStorage.setItem('profileImage', '../../Image/사람_프로필.png');
};

export const Kakao_PopUp = async (): Promise<boolean> => {
  try {
    const result = await login();
    console.log('로그인 로그:', result);
    const profile = await getProfile();
    const nickname = profile.nickname;
    const profileImage =
      profile.profileImageUrl || '../../Image/사람_프로필.png';

    const response = await axios.post(`${Config.AUTH_SERVER_URL}/create-user`, {
      email: profile.email || '이메일 정보가 없습니다.',
      nickname,
    });

    if (response.status === 200 || response.status === 201) {
      showToast('카카오 로그인 성공');
      await AsyncStorage.setItem('nickname', nickname);
      await AsyncStorage.setItem('profileImage', profileImage);
      return true; // 성공 시 true 반환
    } else {
      Alert.alert('서버 응답 오류', `서버 응답 실패: ${response.status}`);
      await resetUserData(); // 초기화 후 false 반환
      return false;
    }
  } catch (error) {
    console.error('로그인 실패 또는 네트워크 오류:', error);
    Alert.alert('오류 발생', '로그인에 실패했습니다.');
    await resetUserData(); // 초기화 후 false 반환
    return false;
  }
};
