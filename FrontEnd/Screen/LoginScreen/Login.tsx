import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../Function/CustomText';
import {useNavigation} from '@react-navigation/native';
import {Kakao_PopUp} from './Login_Success';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  const handleKakaoLogin = async () => {
    console.log('카카오 로그인 클릭!!!!');
    setLoading(true);

    try {
      // AsyncStorage에서 userId 확인
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        console.log(
          `userId(${storedUserId})가 이미 존재합니다. 메인 페이지로 이동합니다.`,
        );
        navigation.navigate('Main');
        return;
      }

      // userId가 없을 경우 카카오 로그인 진행
      const isSuccess = await Kakao_PopUp(); //카카오 팝업 함수 실행 이후 값 저장
      console.log('Kakao_PopUp 호출 결과:', isSuccess);

      // 값이 = true가 아니면 다시 시도
      if (!isSuccess) {
        showToast('카카오 로그인 실패.\n 다시 시도해주세요.');
        return;
      }

      // 로그인 성공 시 회원가입 페이지로 이동
      showToast('회원가입 페이지로 이동합니다.');
      navigation.navigate('UserInfoPage');
    } catch (error) {
      console.error('로그인 중 오류:', error);
      showToast('로그인 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await AsyncStorage.clear(); // 모든 데이터 삭제
      showToast('게스트 계정으로 로그인되었습니다.');
      navigation.navigate('Main'); // 메인 페이지로 이동
    } catch (error) {
      console.error('게스트 로그인 중 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b4b4b4" />
          <CustomText style={styles.loadingText}>로딩 중...</CustomText>
        </View>
      ) : (
        <>
          <View style={styles.appicon}>
            <Image source={require('../../Image/AppLogo.png')} />
            <Image
              source={require('../../Image/AppName.png')}
              style={styles.appname}
            />
          </View>

          <View style={styles.button_view}>
            <TouchableOpacity
              style={styles.kakaoButton}
              activeOpacity={0.7}
              onPress={handleKakaoLogin}>
              <Image
                source={require('../../Image/kakaologo.png')}
                style={styles.login_logo}
              />
              <CustomText style={styles.black_text}>
                카카오계정으로 시작하기
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guestButton}
              activeOpacity={0.7}
              onPress={handleGuestLogin}>
              <Image
                source={require('../../Image/guestlogo.png')}
                style={styles.login_logo}
              />
              <CustomText style={styles.white_text}>
                게스트 계정으로 시작하기
              </CustomText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  appicon: {
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 180,
  },
  appname: {
    marginTop: 12,
  },
  button_view: {
    marginTop: 80,
  },
  kakaoButton: {
    marginTop: 25,
    height: 47,
    width: 324,
    borderRadius: 21,
    backgroundColor: '#FEE500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButton: {
    marginTop: 25,
    height: 47,
    width: 324,
    borderRadius: 21,
    backgroundColor: '#3AA8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  black_text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  white_text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  login_logo: {
    position: 'absolute',
    right: '80%',
  },
});

export default Login;
