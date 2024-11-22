/* eslint-disable react/react-in-jsx-scope */
//메인 화면입니다.
import {useEffect, useState} from 'react';
import {
  StyleSheet, // 스타일 정의를 위한 컴포넌트 
  Image, // 이미지를 렌더링하기 위한 컴포넌트 
  View, // 화면의 영역(컨테이너)을 정의하기 위한 컴포넌트 
  TouchableOpacity, // 터치 가능한 버튼 역할의 컴포넌트 
  TextInput, // 앱 사용자가 텍스트를 입력할 수 있는 입력 필드
  Text, // 텍스트를 렌더링하기 위한 컴포넌트 
  ScrollView,
} from 'react-native';
import {handleMedicineInfo} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar';

// 테스트 데이터 : 서버에서 불러옴 
const test_data = [
  {
    id: 1, // 데이터의 고유 식별자 
    title: '진통제혜진', // 버튼에 표시될 약품 이름 
  },
  {
    id: 2,
    title: '두통약용재',
  },
  {
    id: 3,
    title: '발냄새대현',
  },
  {
    id: 4,
    title: '발냄새혁규',
  },

];
//메인 컴포넌트 정의, navigation 객체를 받아와 화면 전환을 처리 
const Main = ({navigation}) => {
  const [text, setText] = useState(''); // 검색창 테스트 상태. 입력 값이 변경되면 업데이트
  return (
    <>
      {/* 화면 전체를 감싸는 뷰*/}
      <View style={Styles.container}>
        {/* 검색 박스 영역 */}
        <View style={Styles.searchbox}>
          {/* 검색 아이콘 */}
          <TouchableOpacity>
            <Image
              source={require('../../Image/searchicon.png')} // 검색 창 아이콘 이미지 경로
              style={Styles.search_icon} // 아이콘 스타일 정의의
            />
          </TouchableOpacity>
          {/* 검색창 텍스트 입력 필드 */}
          <TextInput
            style={[Styles.search_text, {fontSize: 15, textAlign: 'center'}]} // 텍스트 입력 스타일 추가 
            onChangeText={newText => setText(newText)} // 사용자가 텍스트 입력 시 상태 업데이트 
            placeholder="약의 이름을 입력해주세요" // 사용자 안내용 기본 텍스트 
            placeholderTextColor={'#C0E3FD'} // 기본 텍스트 색상
          />
        </View>

        {/* '약품종류' 제목 */}
        <View
          style={{
            position: 'absolute', // 화면에서 절대 위치 지정 
            marginTop: 133, // 위쪽 여백 
            left: 29, // 왼쪽으로부터의 여백 
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Jua', fontWeight: 'bold'}}>
            약품종류 {/* "약품종류"라는 제목을 화면에 표시 */}
          </Text>
        </View>

        {/* 스크롤 가능한 메뉴 영역 */}
        <ScrollView style={Styles.scrollview_maincontainer}>
          {/* 메뉴 버튼들(약품 종류 목록)을 담는 뷰 */}
          <View style={Styles.menubutton_container}>
            {/* 테스트 데이터를 기반으로 버튼을 동적으로 생성 */}
            {
              test_data.map((item) => (
                <TouchableOpacity
                key={item.id} // React에서 동적 리스트를 렌더링할 때 고유 키 필요 
              activeOpacity={0.7} // 터치 시 버튼 투명도 변화
              style=
              {Styles.menubutton_style} // 버튼 스타일 
              onPress={() =>
                handleMedicineInfo(navigation, item.title) // 버튼 클릭시 실행될 함수
              }>
                {/* 약품 아이콘 */}
              <Image
                source={require('../../Image/pillicon.png')}
                style={Styles.menu_icon}
              />
               {/* 약품 이름 표시 */}
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.title} {/* 동적으로 렌더링된 약품 이름 */}
              </Text>
            </TouchableOpacity>
              ))
            }

          </View>
        </ScrollView>
      </View>

      {/* 하단 네비게이션 바 */}
      <NavigationBar navigation={navigation} />
    </>
  );
};

// 스타일 정의
const Styles = StyleSheet.create({
  // 화면 전체를 감싸는 컨테이너 
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정 
    backgroundColor: 'white', // 
    alignItems: 'center', // 자식 요소들을 수평으로 가운데 정렬
  },

// 검색 박스 스타일 
  searchbox: {
    borderColor: '#EAEAEA', // 
    borderWidth: 1, // 
    borderRadius: 30, // 둥근 모서리
    width: '80%', // 너비를 화면의 80%로 설정
    height: 57, // 고정 높이
    backgroundColor: 'white',
    marginTop: 35,
    elevation: 10,
    shadowColor: 'grey', //ios 그림자 색상
    justifyContent: 'center', // 내부 콘텐츠 수직 정렬 
  },

//검색 돋보기 아이콘
  search_icon: {
    position: 'absolute',
    marginLeft: 272,
    marginTop: 13,
    
  },

  // //검색창 텍스트 스타일 
  search_text: {
    marginLeft: 25,
    width: 240,
    fontSize: 18,
    color: 'black',
  },

  //메뉴 컨테이너 스타일 
  scrollview_maincontainer: {
    width: '90%',
    height: '70%',
    flex: 1,
    // 빨간 박스 표시
    borderWidth: 1,
    borderColor: 'red',
    marginTop: '25%',

  },

  menubutton_container: {
    width:'44%',
    marginTop:'4%',
    left:'10%',
    height: '130%',
    flexDirection: 'row', // 내부 요소들을 가로로 정렬
    flexWrap:'wrap', //줄바꿈 허용 
    justifyContent: 'center', 
    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: 'blue',

  },

// 개별 아이템들

  // 개별 메뉴 버튼 스타일
  menubutton_style: {
    width: '95%', // 버튼 너비 
    height: '20%',
    marginTop: 20,
    borderWidth: 1, 
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    fontSize: 50,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2}, // iOS 그림자 방향 (x, y)
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 3.84, // iOS 그림자 반경 (블러 효과)
    backgroundColor: 'white',
    justifyContent: 'center', // 내부 콘텐츠 수직 정렬
    alignItems: 'center', // 내부 콘텐츠 수평 정렬

    borderWidth: 1,
    borderColor: 'yellow',
    marginTop: '25%',

    
  },

  //메튜 버튼의 아이콘 스타일
  menu_icon: {
    marginBottom: 5, // 아이콘과 텍스트 사이
  },

});

export default Main; // Main 컴포넌트를 외부에서 사용할 수 있도록 내보냄