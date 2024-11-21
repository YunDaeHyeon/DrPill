import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native'; // 필요한 React Native 컴포넌트 불러오기

// 각각의 네비게이션 함수들을 불러옵니다
import {
  goAccount, // 계정 화면으로 이동
  goCamera, // 카메라 화면으로 이동
  goLibrary, // 도서관 화면으로 이동
  goMain, // 메인 화면으로 이동
} from '../../Function/Navigation.tsx'; // 네비게이션 함수들을 지정된 파일에서 불러옵니다

// 네비게이션 바 컴포넌트
export const NavigationBar = ({navigation}) => {
  return (
    // 네비게이션 바를 감싸는 뷰 컴포넌트
    <View style={Styles.navigation_bar}>
      {/* 홈 아이콘, 눌렀을 때 메인 화면으로 이동 */}
      <TouchableOpacity activeOpacity={0.7} onPress={() => goMain(navigation)}>
        <Image
          source={require('../../Image/menu_home.png')}
          style={Styles.home_icon}
        />
      </TouchableOpacity>

      {/* 카메라 아이콘, 눌렀을 때 카메라 화면으로 이동 */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goCamera(navigation)}>
        <Image
          source={require('../../Image/menu_camera.png')}
          style={Styles.camera_icon}
        />
      </TouchableOpacity>

      {/* 도서관 아이콘, 눌렀을 때 도서관 화면으로 이동 */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goLibrary(navigation)}>
        <Image
          source={require('../../Image/menu_library.png')}
          style={Styles.library_icon}
        />
      </TouchableOpacity>

      {/* 계정 아이콘, 눌렀을 때 계정 화면으로 이동 */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goAccount(navigation)}>
        <Image
          source={require('../../Image/menu_account.png')}
          style={Styles.account_icon}
        />
      </TouchableOpacity>
    </View>
  );
};

// 스타일 정의
const Styles = StyleSheet.create({
  navigation_bar: {
    // 네비게이션 바 스타일 정의
    bottom: 0, // 화면 하단에 위치
    right: 0, // 화면 우측에 위치
    flexDirection: 'row', // 아이콘들을 가로 방향으로 나열
    justifyContent: 'space-between', // 아이콘 간의 간격을 균등하게 분배
    alignItems: 'center', // 아이콘들을 수직 중앙 정렬
    backgroundColor: 'white', // 배경색을 흰색으로 설정
    borderColor: '#EAEAEA', // 바닥에 연한 회색 테두리 추가
    borderWidth: 1, // 테두리 두께 1로 설정
    height: 95, // 네비게이션 바의 높이 설정
    width: '100%', // 네비게이션 바의 너비는 화면 전체에 맞추기
    paddingHorizontal: 20, // 네비게이션 바 좌우에 여백을 주기
  },

  icon: {
    // 아이콘 스타일 공통 정의
    width: 65, // 아이콘의 가로 크기
    height: 65, // 아이콘의 세로 크기
    marginTop: 20, // 아이콘 위쪽 여백 추가
    marginBottom: 10, // 아이콘 아래쪽 여백 추가
  },
});
