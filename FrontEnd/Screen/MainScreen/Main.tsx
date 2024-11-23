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
} from 'react-native';
import {handleMedicineInfo} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar';
import Config from 'react-native-config';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Main = ({navigation}) => {
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState('효능');

  const placeholderText = {
    효능: '효능을 입력하세요',
    제품명: '제품을 입력하세요',
    제조사: '제조사를 입력하세요',
  };

  // 검색
  /*
    [요청변수]
    entpName : 업체 이름
    itemName : 약 이름
    efcyQesitm : 약 효능
    useMethodQesitm : 사용법

    [응답변수]
    totalCount : 전체 결과 수
    entpName : 업체명
    itemName : 제품명
    itemSeq : 품목기준코드
    efcyQesitm : 약의 효능
    useMethodQesitm : 약의 사용법
    atpnQesitm : 약의 주의사항
    seQesitm : 약의 부작용
    depositMethodQesitm : 약의 보관법
  */
  const onSearchMedicineHandler = async text => {
    try {
      // 옵션에 따라 필드명을 결정
      let queryField = '';
      if (selectedOption === '효능') {
        queryField = 'efcyQesitm';
      } else if (selectedOption === '제조사') {
        queryField = 'entpName';
      } else if (selectedOption === '제품명') {
        queryField = 'itemName';
      }

      // 동적으로 URL 생성
      const response = await axios.get(
        `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?` +
          `serviceKey=${Config.React_APP_API_KEY}&` +
          `${queryField}=${text}&` +
          `type=json`,
      );

      console.log('값 : ', response.data); // 결과 출력
    } catch (error) {
      console.error('에러 발생: ', error);
    }
  };

  return (
    <>
      {/* 전체 화면의 컨테이너 */}
      <View style={Styles.container}>
        {/* 검색 박스 */}
        <View style={Styles.searchbox}>
          {/* 드롭박스 */}
          <Picker
            selectedValue={selectedOption}
            onValueChange={itemValue => setSelectedOption(itemValue)}
            style={Styles.search_select}>
            <Picker.Item label="효능" value="효능" />
            <Picker.Item label="제품명" value="제품명" />
            <Picker.Item label="제조사" value="제조사" />
          </Picker>

          {/* 검색 입력창 */}
          <TextInput
            style={Styles.search_text}
            onChangeText={newText => setText(newText)}
            placeholder={placeholderText[selectedOption]} // 선택된 옵션에 따른 placeholder
            placeholderTextColor={'#C0E3FD'}
          />

          {/* 검색 아이콘 */}
          <TouchableOpacity onPress={() => onSearchMedicineHandler(text)}>
            <Image
              source={require('../../Image/searchicon.png')}
              style={Styles.search_icon}
            />
          </TouchableOpacity>
        </View>

        {/* '약품종류' 텍스트 */}
        <View
          style={{
            position: 'absolute',
            marginTop: 133,
            left: 29,
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Jua', fontWeight: 'bold'}}>
            약품종류
          </Text>
        </View>

        {/* 메뉴 버튼 뷰 */}
        <View style={Styles.menubutton_view}>
          {/* 첫 번째 열의 버튼 */}
          <View style={Styles.menubutton_1}>
            {/* 소화제 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 152,
                height: 88,
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderRadius: 10,
                elevation: 5,
                shadowColor: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
              }}
              onPress={() => handleMedicineInfo(navigation, '해열제')}>
              <Image
                source={require('../../Image/headicon.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '18%', fontSize: 20, fontWeight: 'bold'}}>
                해열, 진통제
              </Text>
            </TouchableOpacity>

            {/* 감기약 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '발한제')}>
              <Image
                source={require('../../Image/sweaticon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>백엔드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '진통제')}>
              <Image
                source={require('../../Image/sweaticon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>백엔드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '지한제')}>
              <Image
                source={require('../../Image/sweaticon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>백엔드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '소염제')}>
              <Image
                source={require('../../Image/sweaticon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>백엔드</Text>
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
    flexDirection: 'row', // 가로 정렬
    alignItems: 'center', // 세로 정렬
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 30,
    width: '90%',
    height: 57,
    backgroundColor: 'white',
    marginTop: 35,
    elevation: 10,
    shadowColor: 'grey',
    fontSize: 10,
  },
  search_select: {
    width: '30%', // 드롭박스 너비
    marginLeft: 10, // 드롭박스와 검색창 간격
    color: 'black',
  },
  search_text: {
    flex: 1, // 남은 공간을 모두 사용
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  search_icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },

  menubutton_view: {
    //메뉴상자 뷰
    width: 321,
    height: 414,
    marginTop: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    shadowOffset: {width: 0, height: 2}, // iOS 그림자 방향 (x, y)
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
