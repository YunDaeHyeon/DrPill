//네비게이션
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BackHandler, ToastAndroid, Alert} from 'react-native';

import Login from './Screen/LoginScreen/Login.tsx'; //로그인 화면

import Main from './Screen/MainScreen/Main.tsx'; // 어플 메인 화면
import MedicineInfo from './Screen/MainScreen/MedicineInfo.tsx'; // 알레르기 약 상세정보 화면

import CameraCapture from './Screen/Camera/CameraCapture.tsx'; // 카메라 메인화면
import FindMedicine from './Screen/Camera/Find_Medicine.tsx'; // 찾은 약 정보화면
import Gallery from './Screen/Camera/Gallery.tsx'; //갤러리
import MedicineCheck from './Screen/Camera/Medicine_Check.tsx';
import DetectedImages from './Screen/Camera/DetectedImage.tsx'; //찍은 약 감지

import PillLibrary from './Screen/Medicinie_Library/Pill_Library.tsx'; // 약 도서관 화면

import MyPage from './Screen/MyPage/MyPage.tsx'; // 마이페이지 화면
import {MedicineListProvider} from './Function/MainListContext.tsx';

import LogoutDeleteScreen from './Screen/MyPage/LogoutDeleteScreen.tsx';
import Disease_Data from './Screen/LoginScreen/Disease_Data.tsx';
import UserInfoPage from './Screen/LoginScreen/UserInfoPage.tsx';
import AudioTts from './Screen/MyPage/audiotts.tsx';
import {VoiceProvider} from './Function/VoiceProvider.tsx';
import PillInfoScreen from './Screen/Camera/PillInfoScreen.tsx';

const Stack = createNativeStackNavigator();

const App = () => {
  const backPressedOnceRef = useRef(false);
  const backTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const backAction = () => {
      if (backPressedOnceRef.current) {
        Alert.alert(
          '앱 종료',
          '정말 앱을 종료하시겠습니까?',
          [
            {text: '취소', onPress: () => null, style: 'cancel'},
            {text: '확인', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
        return true;
      }

      backPressedOnceRef.current = true;
      ToastAndroid.show(
        '뒤로가기를 한 번 더 누르면 앱이 종료됩니다',
        ToastAndroid.SHORT,
      );

      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current);
      }

      backTimeoutRef.current = setTimeout(() => {
        backPressedOnceRef.current = false;
      }, 2000);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current);
      }
    };
  }, []);

  return (
    <VoiceProvider>
      <NavigationContainer>
        <MedicineListProvider>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              animation: 'slide_from_right', // 오른쪽에서 왼쪽으로 전환 설정
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="MedicineInfo"
              component={MedicineInfo}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="FindMedicine"
              component={FindMedicine}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="PillLibrary"
              component={PillLibrary}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="MyPage"
              component={MyPage}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Gallery"
              component={Gallery}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="CameraCapture"
              component={CameraCapture}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="MedicineCheck"
              component={MedicineCheck}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="LogoutDeleteScreen"
              component={LogoutDeleteScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Disease_Data"
              component={Disease_Data}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserInfoPage"
              component={UserInfoPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AudioTts"
              component={AudioTts}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PillInfoScreen"
              component={PillInfoScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </MedicineListProvider>
      </NavigationContainer>
    </VoiceProvider>
  );
};

export default App;
