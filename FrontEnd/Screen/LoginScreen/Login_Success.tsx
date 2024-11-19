import React from 'react';
import {ToastAndroid} from 'react-native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const showToast = message => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Guest_PopUp = async (navigation): Promise<void> => {
  try {
    // 모든 사용자 관련 정보 삭제
    await Promise.all([
      AsyncStorage.removeItem('userProfile'),
      AsyncStorage.removeItem('userInfo'),
      AsyncStorage.removeItem('diseaseInterests'),
      AsyncStorage.removeItem('medicineInterests'),
    ]);

    // Toast 메시지 출력
    ToastAndroid.showWithGravity(
      '게스트 계정으로 로그인되었습니다.',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    // 메인 화면으로 이동
    navigation.navigate('Main'); // 비동기 작업 완료 후 이동
  } catch (error) {
    console.error('스토리지 초기화 중 오류:', error);
  }
};

export const Kakao_PopUp = async (): Promise<boolean> => {
  try {
    const result = await login();
    console.log('로그인 로그:', result);

    // 로그인 성공 후 프로필 가져오기
    const profile = await getProfile();
    console.log('카카오 프로필 데이터:', profile);

    if (profile) {
      const nickname = profile.nickname || '닉네임 없음';
      const email = profile.email || '이메일 없음';
      const profileImage =
        profile.profileImageUrl || '../../Image/사람_프로필.png';

      // 프로필 데이터를 AsyncStorage에 저장
      await AsyncStorage.setItem(
        'userProfile',
        JSON.stringify({nickname, email, profileImage}),
      );

      showToast('카카오 로그인 성공');
      return true; // 성공 시 true 반환
    } else {
      // 프로필 데이터가 없으면 로그인 실패 처리
      console.error('프로필 데이터를 가져오지 못했습니다.');
      showToast('로그인에 실패했습니다. 다시 시도해주세요.');
      return false;
    }
  } catch (error) {
    // 로그인 실패 또는 프로필 가져오기 실패
    console.error('로그인 실패 또는 네트워크 오류:', error);
    showToast('로그인에 실패했습니다. 다시 시도해주세요.');
    return false; // 실패 시 false 반환
  }
};
