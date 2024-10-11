//네비게이션
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Screen/LoginScreen/Login.tsx'; //로그인 화면

import Main from './Screen/MainScreen/Main.tsx'; // 어플 메인 화면
import AllergyInfo from './Screen/MainScreen/Allergy_List.tsx'; // 알레르기 약 상세정보 화면
import AntiInfo from './Screen/MainScreen/Anti_List.tsx'; // 소염제 약 상세정보 화면
import ColdInfo from './Screen/MainScreen/Cold_List.tsx'; // 감기약 상세정보 화면
import DigestInfo from './Screen/MainScreen/Digest_List.tsx'; // 소화제 상세정보 화면
import PainkillInfo from './Screen/MainScreen/Painkill_List.tsx'; // 진통제 상세정보 화면
import VitaminInfo from './Screen/MainScreen/Vitamin_List.tsx'; // 비타민 상세정보 화면

import CameraMain from './Screen/Camera/Camera_Main.tsx'; // 카메라 메인화면
import FindMedicine from './Screen/Camera/Find_Medicine.tsx'; // 찾은 약 정보화면

import PillLibrary from './Screen/Medicinie_Library/Pill_Library.tsx'; // 약 도서관 화면

import MyPage from './Screen/MyPage/MyPage.tsx'; // 마이페이지 화면
import ProfileEdit from './Screen/MyPage/Profile_Edit.tsx'; //프로필 수정 화면

import CameraCapture from './Screen/Camera/CameraCapture.tsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
          name="AllergyInfo"
          component={AllergyInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AntiInfo"
          component={AntiInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ColdInfo"
          component={ColdInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DigestInfo"
          component={DigestInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PainkillInfo"
          component={PainkillInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="VitaminInfo"
          component={VitaminInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CameraMain"
          component={CameraMain}
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
          name="ProfileEdit"
          component={ProfileEdit}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CameraCapture"
          component={CameraCapture}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
