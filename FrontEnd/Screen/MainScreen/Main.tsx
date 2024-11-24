/* eslint-disable react/react-in-jsx-scope */
//메인 화면입니다.
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import CustomText from '../../Function/CustomText.tsx';
import {handleMedicineInfo} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar';
import Config from 'react-native-config';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = ({navigation}) => {
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState('효능');
  const [interestDisease, setInterestDisease] = useState([]);
  const [backPressedOnce, setBackPressedOnce] = useState(false); // 뒤로가기 버튼 상태

  const placeholderText = {
    효능: '효능을 입력하세요',
    질환: '질환을 입력하세요',
    제품명: '제품을 입력하세요',
    제조사: '제조사를 입력하세요',
  };

  useEffect(() => {
    const callInterestMedicine = async () => {
      const interest_disease = await AsyncStorage.getItem('diseaseInterests');
      const clean_data = interest_disease.replace(/[\[\]"]+/g, '');
      const array_data = clean_data?.split(',');
      const result = array_data.map((item, index) => ({
        id: index + 1,
        name: item.trim(),
      }));
      console.log('결과 : ', result);
      setInterestDisease(result);
    };

    const backAction = () => {
      if (backPressedOnce) {
        // 두 번째 뒤로가기가 감지되면 Alert 표시
        Alert.alert(
          '앱 종료',
          '정말 앱을 종료하시겠습니까?',
          [
            {
              text: '취소',
              onPress: () => null, // 아무 동작도 하지 않음
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => BackHandler.exitApp(), // 앱 종료
            },
          ],
          {cancelable: true}, // Alert 바깥을 눌러도 닫히지 않게 설정
        );
        return true;
      }

      // 첫 번째 뒤로가기: 메시지 표시 및 상태 업데이트
      setBackPressedOnce(true);
      ToastAndroid.show(
        '뒤로가기를 한 번 더 누르면 앱 종료 안내가 표시됩니다.',
        ToastAndroid.SHORT,
      );

      // 일정 시간 후 상태 초기화
      setTimeout(() => {
        setBackPressedOnce(false);
      }, 2000); // 2초

      return true; // 기본 동작 방지
    };

    // 뒤로가기 이벤트 리스너 등록
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    callInterestMedicine();
    // 컴포넌트 언마운트 시 리스너 제거
    return () => backHandler.remove();
  }, [backPressedOnce]);

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
      let queryField = '';
      if (selectedOption === '효능' || selectedOption === '질환') {
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
            <Picker.Item label="질환" value="질환" />
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

        <CustomText style={Styles.main_font}>질환 종류</CustomText>
        <ScrollView style={Styles.medicine_container}>
          <View style={Styles.sub_container}>
            {interestDisease.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={Styles.menubutton_style}
                onPress={() => handleMedicineInfo(navigation, item.name)}>
                <Image
                  source={require('../../Image/pillicon.png')}
                  style={Styles.menu_icon}
                />
                <CustomText style={Styles.menu_text}>{item.name}</CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

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
    fontFamily: 'Jua-Regular',
  },
  search_text: {
    flex: 1, // 남은 공간을 모두 사용
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontFamily: 'Jua-Regular',
  },
  search_icon: {
    width: 24,
    height: 24,
    marginRight: 15,
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
