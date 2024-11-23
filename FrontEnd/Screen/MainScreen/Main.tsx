/* eslint-disable react/react-in-jsx-scope */
//메인 화면입니다.
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';
import {handleMedicineInfo} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar';

// 테스트 데이터
const test_data = [
  {
    id: 1,
    title: '약 1',
  },
  {
    id: 2,
    title: '약 2',
  },
  {
    id: 3,
    title: '약 3',
  },
  {
    id: 4,
    title: '약 4',
  },
  {
    id: 5,
    title: '약 5',
  },
  {
    id: 6,
    title: '약 6',
  },
  {
    id: 7,
    title: '약 7',
  },
  {
    id: 8,
    title: '약 8',
  },
  {
    id: 9,
    title: '약 9',
  },
  {
    id: 10,
    title: '약 10',
  },
  {
    id: 11,
    title: '약 11',
  },
  {
    id: 12,
    title: '약 12',
  },
];

const Main = ({navigation}) => {
  const [text, setText] = useState(''); //text지우면 안됨
  return (
    <>
      {/* 전체 화면의 컨테이너 */}
      <View style={Styles.container}>
        {/* 검색 박스 */}
        <View style={Styles.searchbox}>
          <TouchableOpacity>
            <Image
              source={require('../../Image/searchicon.png')}
              style={Styles.search_icon}
            />
          </TouchableOpacity>
          <TextInput
            style={[Styles.search_text, {fontSize: 15, textAlign: 'center'}]} // 텍스트 크기와 정렬 설정
            onChangeText={newText => setText(newText)} // 입력 텍스트 상태 갱신
            placeholder="약의 이름을 입력해주세요" // 입력 필드의 기본 안내 텍스트
            placeholderTextColor={'#C0E3FD'} // 기본 텍스트 색상
          />
        </View>

        <Text style={Styles.main_font}>약품 종류</Text>
        <ScrollView style={Styles.medicine_container}>
          <View style={Styles.sub_container}>
            {test_data.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={Styles.menubutton_style}
                onPress={() => handleMedicineInfo(navigation, '발한제 지한제')}>
                <Image
                  source={require('../../Image/pillicon.png')}
                  style={Styles.menu_icon}
                />
                <Text style={Styles.menu_text}>{item.title}</Text>
              </TouchableOpacity>
            ))}
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
  // 전체 화면 컨테이너 스타일
  container: {
    flex: 1, // 화면 전체를 차지
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
    marginTop: 35,
    elevation: 10,
    shadowColor: 'grey',
    justifyContent: 'center',
  },

  search_icon: {
    //검색 돋보기 아이콘
    position: 'absolute',
    marginLeft: 272,
    marginTop: 13,
  },

  search_text: {
    //검색창 글씨
    marginLeft: 25,
    width: 240,
    fontSize: 18,
    color: 'black',
  },

  // 타이틀
  main_font: {
    position: 'absolute',
    marginTop: 120,
    left: 30,
    fontSize: 24,
    color: 'black',
  },

  medicine_container: {
    width: '90%',
    marginTop: '20%',
    marginBottom: '5%',
  },

  sub_container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row', // 중요
    flexWrap: 'wrap', // 중요
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  // 개별 메뉴 버튼 스타일
  menubutton_style: {
    width: '43%', // 부모 뷰의 너비를 가득 채움
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center', // 내부 콘텐츠 수직 정렬
    borderWidth: 1, // 테두리 두께
    borderColor: '#D9D9D9',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 2,
    alignItems: 'center', // 내부 콘텐츠 수평 정렬
    margin: 10,
  },

  //메튜 버튼의 아이콘 스타일
  menu_icon: {
    marginBottom: 3, // 아이콘과 텍스트 사이
  },

  menu_text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Main;
