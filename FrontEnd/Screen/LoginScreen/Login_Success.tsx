import React from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const Guest_PopUp = async (): Promise<void> => {
  ToastAndroid.showWithGravity(
    '게스트 계정으로 로그인 되었습니다.\n게스트 계정 이용 시 저장이 제한됩니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );

  // 게스트 로그인 시 기본 값 설정
  await AsyncStorage.setItem('nickname', 'GUEST');
  await AsyncStorage.setItem('profileImage', '../../Image/사람_프로필.png');
};

export const Kakao_PopUp = async (navigation): Promise<void> => {
  try {
    console.log('Kakao_PopUp 함수 실행됨');

    // 카카오 로그인 시도
    const result = await login();
    console.log('로그인 성공:', result);

    // 프로필 정보 가져오기
    const profile = await getProfile();
    const nickname = profile.nickname;
    const profileImage =
      profile.profileImageUrl || '../../Image/사람_프로필.png';
    console.log('프로필 데이터:', {nickname, profileImage});

    // 서버에 사용자 정보 전송
    try {
      const response = await axios.post(
        'http://192.168.37.235:3000/create-user',
        {
          email: profile.email || '이메일 정보가 없습니다.',
          nickname,
        },
      );
      console.log('서버 응답:', response.status, response.data);

      if (response.status === 200 || response.status === 201) {
        // 로그인 성공 메시지 표시
        ToastAndroid.showWithGravity(
          '로그인 성공! 메인 화면으로 이동해 주세요.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        // 데이터 저장
        await AsyncStorage.setItem('nickname', nickname);
        await AsyncStorage.setItem('profileImage', profileImage);
      } else {
        Alert.alert('서버 응답 오류', `서버 응답 실패: ${response.status}`);
        await AsyncStorage.removeItem('nickname'); // 로그인 실패시 AsyncStorage 초기화
        await AsyncStorage.removeItem('profileImage');
        navigation.navigate('Login'); // 서버 오류 시 로그인 화면으로 이동
      }
    } catch (serverError) {
      console.error('서버 요청 실패:', serverError);
      Alert.alert('서버 오류', '서버 요청 실패');
      await AsyncStorage.removeItem('nickname'); // 로그인 실패시 AsyncStorage 초기화
      await AsyncStorage.removeItem('profileImage');
      navigation.navigate('Login'); // 서버 오류 시 로그인 화면으로 이동
    }
  } catch (error) {
    console.error('로그인 실패 또는 네트워크 오류:', error);
    await AsyncStorage.removeItem('nickname'); // 로그인 실패시 AsyncStorage 초기화
    await AsyncStorage.removeItem('profileImage');
    navigation.navigate('Login'); // 로그인 실패 시 로그인 화면으로 이동
  }
};
