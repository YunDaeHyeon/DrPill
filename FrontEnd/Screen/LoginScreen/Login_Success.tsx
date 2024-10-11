import {ToastAndroid} from 'react-native';

export const Google_PopUp = () => {
  ToastAndroid.showWithGravity(
    '구글 계정으로 로그인 되었습니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Apple_PopUp = () => {
  ToastAndroid.showWithGravity(
    '애플 계정으로 로그인 되었습니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Kakao_PopUp = () => {
  ToastAndroid.showWithGravity(
    '카카오 계정으로 로그인 되었습니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

export const Guest_PopUp = () => {
  ToastAndroid.showWithGravity(
    '게스트 계정으로 로그인 되었습니다.\n게스트 계정 이용시 저장이 제한됩니다.',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};
