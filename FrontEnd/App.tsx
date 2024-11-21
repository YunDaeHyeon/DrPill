//네비게이션
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

import TestComponent from './Screen/MyPage/TestComponent.tsx';
import Disease_Data from './Screen/LoginScreen/Disease_Data.tsx';
import Medicine_Data from './Screen/LoginScreen/Medicine_Data.tsx';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
            name="CameraCapture"
            component={CameraCapture}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Gallery"
            component={Gallery}
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
          name="CameraCapture"
          component={CameraCapture}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MedicineCheck"
          component={MedicineCheck}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TestComponent"
          component={TestComponent}
          options={{headerShown: false}}
        />

<Stack.Screen
          name="Disease_Data"
          component={Disease_Data}
          options={{headerShown: false}}
        />

<Stack.Screen
          name="Medicine_Data"
          component={Medicine_Data}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
