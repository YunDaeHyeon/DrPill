import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Kakao_PopUp, Guest_PopUp} from './Login_Success';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가

  // 카카오 로그인 버튼 클릭 시 함수
  const handleKakaoLogin = async () => {
    setLoading(true); // 로딩 시작
    setErrorMessage(''); // 이전 오류 메시지 초기화

    const isSuccess = await Kakao_PopUp();
    setLoading(false); // 로딩 종료

    if (isSuccess) {
      navigation.navigate('Main'); // 로그인 성공 시 Main 화면으로 이동
    } else {
      setErrorMessage('서버 접속에 문제가 발생했습니다. 다시 시도해주세요.');
      ToastAndroid.showWithGravity(
        '카카오 로그인 실패. 다시 시도해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  // 게스트 로그인 버튼 클릭 시 함수
  const handleGuestLogin = async () => {
    setLoading(true); // 로딩 시작

    await Guest_PopUp();

    setTimeout(() => {
      setLoading(false); // 로딩 종료
      navigation.navigate('Main'); // 게스트 로그인 시 Main 화면으로 이동
    }, 500);
  };

  return (
    <View style={Styles.container}>
      {loading ? (
        // 로딩 화면 표시
        <View style={Styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#b4b4b4"
            style={{transform: [{scale: 1.5}]}}
          />
          <Text style={{color: 'black', fontWeight: 'bold', marginTop: 17}}>
            로딩 중...
          </Text>
        </View>
      ) : (
        <>
          <View style={Styles.appicon}>
            <Image source={require('../../Image/AppLogo.png')} />
            <Image
              source={require('../../Image/AppName.png')}
              style={Styles.appname}
            />
          </View>

          <View style={Styles.button_view}>
            <TouchableOpacity
              style={Styles.kakaoButton}
              activeOpacity={0.7}
              onPress={handleKakaoLogin}>
              <Image
                source={require('../../Image/kakaologo.png')}
                style={Styles.login_logo}
              />
              <Text style={Styles.black_text}>카카오 계정으로 로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.guestButton}
              activeOpacity={0.7}
              onPress={handleGuestLogin}>
              <Image
                source={require('../../Image/guestlogo.png')}
                style={Styles.login_logo}
              />
              <Text style={Styles.white_text}>게스트 계정으로 로그인</Text>
            </TouchableOpacity>
          </View>

          {/* 오류 메시지 표시 */}
          {errorMessage ? (
            <Text style={Styles.errorText}>{errorMessage}</Text>
          ) : null}
        </>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  loadingContainer: {
    // 로딩 화면 스타일
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  appname: {
    //약선생
    marginTop: 12,
  },

  appicon: {
    //앱로고
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 180,
  },

  button_view: {
    //로그인 버튼 뷰
    marginTop: 80,
  },

  kakaoButton: {
    //카카오 로그인 버튼
    marginTop: 25,
    height: 47,
    width: 324,
    borderRadius: 21,
    backgroundColor: '#FEE500',
    justifyContent: 'center',
    alignItems: 'center',
  },

  guestButton: {
    //게스트 로그인 버튼
    marginTop: 25,
    height: 47,
    width: 324,
    borderRadius: 21,
    backgroundColor: '#3AA8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  black_text: {
    //로그인 검은 글씨 설정
    fontSize: 15,
    color: 'black',
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },

  white_text: {
    //로그인 하얀 글씨 설정
    fontSize: 15,
    color: 'white',
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },

  login_logo: {
    //로그인 버튼 각각의 로고
    position: 'absolute',
    right: '80%',
  },

  errorText: {
    // 오류 메시지 스타일
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
