import { useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';

// Function 디렉토리에서 내보낸 다양한 약 정보 핸들러를 import
// 각 핸들러는 특정 약 정보 페이지로 네비게이션하는 역할을 함
import {
  handleAllergyInfo,
  handleAntiInfo,
  handleColdInfo,
  handleDigestInfo,
  handlePainkillInfo,
  handleVitaminInfo,
} from '../../Function/Navigation.tsx';

// 하단 네비게이션 바 컴포넌트 import
import { NavigationBar } from '../Commonness/NavigationBar';

// Main 컴포넌트 정의, navigation 객체를 props로 받음
const Main = ({ navigation }) => {
  const [text, setText] = useState(''); // 상태 변수 text와 상태 갱신 함수 setText 정의

  return (
    <>
      {/* 전체 화면의 컨테이너 */}
      <View style={Styles.container}>
        {/* 검색 박스 */}
        <View style={Styles.searchbox}>
          {/* 돋보기 아이콘 */}
          <Image
            source={require('../../Image/돋보기.png')}
            style={Styles.search_icon}
          />
          {/* 검색어 입력 필드 */}
          <TextInput
            style={[Styles.search_text, { fontSize: 15, textAlign: 'center' }]} // 텍스트 크기와 정렬 설정
            onChangeText={newText => setText(newText)} // 입력 텍스트 상태 갱신
            placeholder="약의 이름을 입력해주세요" // 입력 필드의 기본 안내 텍스트
            placeholderTextColor={'#C0E3FD'} // 기본 텍스트 색상
          />
        </View>

        {/* '약품종류' 텍스트 */}
        <View
          style={{
            position: 'absolute', // 고정 위치 설정
            marginTop: 151, // 위쪽 여백
            left: 29, // 왼쪽 위치
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: 'Jua', fontWeight: 'bold' }}>
            약품종류
          </Text>
        </View>

        {/* 메뉴 버튼 뷰 */}
        <View style={Styles.menubutton_view}>
          {/* 첫 번째 열의 버튼 */}
          <View style={Styles.menubutton_1}>
            {/* 소화제 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7} // 클릭 시 투명도 조정
              style={Styles.menubutton_style} // 버튼 스타일 지정
              onPress={() => handleDigestInfo(navigation)} // 소화제 화면으로 이동
            >
              <Image
                source={require('../../Image/소화제_아이콘.png')} // 소화제 아이콘 이미지
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>소화제</Text>
            </TouchableOpacity>

            {/* 감기약 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleColdInfo(navigation)}
            >
              <Image
                source={require('../../Image/감기약_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>감기약</Text>
            </TouchableOpacity>

            {/* 비타민 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleVitaminInfo(navigation)}
            >
              <Image
                source={require('../../Image/비타민_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>비타민</Text>
            </TouchableOpacity>

            {/* 구강약 버튼 (추가됨) */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleVitaminInfo(navigation)} // 임시로 비타민 핸들러 사용
            >
              <Image
                source={require('../../Image/비타민_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>구강약</Text>
            </TouchableOpacity>
          </View>

          {/* 두 번째 열의 버튼 */}
          <View style={Styles.menubutton_2}>
            {/* 진통제 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handlePainkillInfo(navigation)}
            >
              <Image
                source={require('../../Image/진통제_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>진통제</Text>
            </TouchableOpacity>

            {/* 알레르기 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleAllergyInfo(navigation)}
            >
              <Image
                source={require('../../Image/알레르기_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>알레르기</Text>
            </TouchableOpacity>

            {/* 소염제 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleAntiInfo(navigation)}
            >
              <Image
                source={require('../../Image/소염제_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>소염제</Text>
            </TouchableOpacity>

            {/* 땀 약 버튼 (추가됨) */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleAntiInfo(navigation)} // 임시로 소염제 핸들러 사용
            >
              <Image
                source={require('../../Image/소염제_아이콘.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>땀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 하단 네비게이션 바 */}
      <NavigationBar navigation={navigation} />
    </>
  );
};

// 스타일 정의
const Styles = StyleSheet.create({
  // 전체 화면 컨테이너 스타일 
  container: {
    flex: 1, // 화면 넌체를 차지 
    backgroundColor: 'white', // 배경 흰색
    alignItems: 'center', // 자식 요소들을 수평으로 가운데 정렬
  },

  searchbox: {
    borderColor: '#EAEAEA', // 테두리 색상
    borderWidth: 1, // 테두리 두께
    borderRadius: 30, // 둥근 모서리
    width: '80%', // 너비를 화면의 80%로 설정
    height: 57, // 고정 높이 
    backgroundColor: 'white',
    marginTop: 50, // 상단 여백 
    elevation: 10, // Android 그림자 효과

    shadowColor: 'grey', // 그림자 색상 
    /*ios 그림자 효과*/
    shadowOffset: { width: 0, height: 5 }, // 그림자 위치
    shadowOpacity: 0.25, // 그림자 투명도
    shadowRadius: 5, // 그림자 퍼짐 정도
    justifyContent: 'center', // 내부 콘텐츠 수직 정렬 
  },

  search_icon: {
    position: 'absolute', // 절대 위치
    marginLeft: 35, // 왼쪽 여백
  },

  search_text: {
    marginLeft: 70, // 왼쪽 여백
    fontSize: 15, // 텍스트 크기
    color: 'black', // 텍스트 색상
    textAlign: 'center', // 텍스트 가운데 정렬 
  }, 
// 메뉴 버튼 뷰 스타일 (전체 컨테이너)
  menubutton_view: {
    width: '90%', // 화면의 90% 너비 
    height: 306,  // 고정 높이
    marginTop: 90, // 상단 여백
    flexDirection: 'row', // 가로 방향으로 배치 
    flexWrap: 'wrap', // 버튼이 화면을 넘어갈 경우 줄바꿈 
    justifyContent: 'space-between', // 버튼 간 간격 조정 
  },

  // 첫 번째 열 버튼 스타일 
  menubutton_1: {
    width: '45%',
  },

  // 두 번재 열 버튼 스타일 
  menubutton_2: {
    width: '45%',
  },

  // 개별 메뉴 버튼 스타일 
  menubutton_style: {
    width: '100%', // 부모 뷰의 너비를 가득 채움 
    height: 88, 
    marginTop: 20,
    borderWidth: 1, // 테두리 두께 
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 방향 (x, y)
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 3.84, // iOS 그림자 반경 (블러 효과)
    backgroundColor: 'white',
    justifyContent: 'center', // 내부 콘텐츠 수직 정렬
    alignItems: 'center', // 내부 콘텐츠 수평 정렬 
  },

  //메튜 버튼의 아이콘 스타일
  menu_icon: {
    marginBottom: 5, // 아이콘과 텍스트 사이
  },

  menu_text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Main;
