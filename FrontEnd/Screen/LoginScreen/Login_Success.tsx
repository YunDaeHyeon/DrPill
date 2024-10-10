import React, { useEffect } from 'react';
import { View, Button, Alert,ToastAndroid } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';

export const Google_PopUp = () => {
    ToastAndroid.showWithGravity(
        "구글 계정으로 로그인 되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
};

export const Apple_PopUp = () => {
    ToastAndroid.showWithGravity(
        "애플 계정으로 로그인 되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
};

export const Kakao_PopUp = async (): Promise<void> => {
    try {
        const result = await login();
        console.log('로그인 성공:', result);
        Alert.alert('로그인 성공', JSON.stringify(result));
      } catch (error: unknown) {
        console.error('로그인 실패:', error);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류 발생';
        Alert.alert('로그인 실패', errorMessage);
      }
};

export const Guest_PopUp = () => {
    ToastAndroid.showWithGravity(
        "게스트 계정으로 로그인 되었습니다.\n게스트 계정 이용시 저장이 제한됩니다.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
};