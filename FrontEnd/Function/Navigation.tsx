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
  navigation.dispatch(CommonActions.navigate('CameraCapture'));
};

export const goLibrary = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('PillLibrary'));
};

export const goAccount = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('MyPage'));
};

//메인에서 정보창으로
export const handleMedicineInfo = (
  navigation: NavigationProp<any>,
  text: String,
  queryField?: String,
) => {
  console.log(text);
  navigation.dispatch(
    CommonActions.navigate('MedicineInfo', {
      medicineName: text,
      category: queryField,
    }),
  );
};

//카메라에서 약 세부정보 화면 진입
export const goFindMedicine = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('FindMedicine'));
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

//찍은 사진 감별
export const handleDetectedImages = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('DetectedImages'));
};

//찍은약
export const handleMedicineCheck = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('MedicineCheck'));
};

export const handleLogoutDeleteScreen = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.navigate('LogoutDeleteScreen'));
};
