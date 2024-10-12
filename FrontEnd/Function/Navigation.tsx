import {CommonActions} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';

// 로그인
export const handleLoginSuccess = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('Main'));
};

//네비게이션 명령
export const goMain = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('Main'));
};

export const goCamera = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('CameraMain'));
};

export const goLibrary = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('PillLibrary'));
};

export const goAccount = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('MyPage'));
};

//메인에서 정보창으로
export const handleAllergyInfo = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('AllergyInfo'));
};

export const handleAntiInfo = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('AntiInfo'));
};

export const handleColdInfo = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('ColdInfo'));
};

export const handleDigestInfo = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('DigestInfo'));
};

export const handlePainkillInfo = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('PainkillInfo'));
};

export const handleVitaminInfo = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('VitaminInfo'));
};

//카메라에서 약 세부정보 화면 진입
export const goFindMedicine = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('FindMedicine'));
};

//내 정보 수정
export const handleProfileEdit = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('ProfileEdit'));
};

// 카메라 테스트
export const CameraCapture = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('CameraCapture'));
};

export const editSave = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('MyPage'));
  ToastAndroid.showWithGravity(
    '회원정보가 저장되었습니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

//갤러리
export const handleGAllery = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('Gallery'));
};