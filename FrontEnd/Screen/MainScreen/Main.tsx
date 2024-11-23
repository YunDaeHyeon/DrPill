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
  Alert,
  BackHandler,
} from 'react-native';
import {handleMedicineInfo} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar';
import {ToastAndroid} from 'react-native';

const Main = ({navigation}) => {
  const [text, setText] = useState(''); //text지우면 안됨
  const [backPressedOnce, setBackPressedOnce] = useState(false); // 뒤로가기 버튼 상태

  useEffect(() => {
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

    // 컴포넌트 언마운트 시 리스너 제거
    return () => backHandler.remove();
  }, [backPressedOnce]); // 추가: 뒤로가기 버튼 로직

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
              onPress={() =>
                handleMedicineInfo(navigation, '해열·진통 소염제')
              }>
              <Image
                source={require('../../Image/headicon.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '18%', fontSize: 20, fontWeight: 'bold'}}>
                해열·진통{'\n'}소염제
              </Text>
            </TouchableOpacity>

            {/* 감기약 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '발한제 지한제')}>
              <Image
                source={require('../../Image/sweaticon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>발한제 지한제</Text>
            </TouchableOpacity>

            {/* 비타민 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '안과용제')}>
              <Image
                source={require('../../Image/eye.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '20%', fontSize: 20, fontWeight: 'bold'}}>
                안과용제
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '구강용약')}>
              <Image
                source={require('../../Image/tooth.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '20%', fontSize: 20, fontWeight: 'bold'}}>
                구강용약
              </Text>
            </TouchableOpacity>

            {/* 구강약 버튼 (추가됨) */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 152,
                height: 88,
                marginLeft: 6,
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderRadius: 10,
                elevation: 5,
                shadowColor: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
              }}
              onPress={() => handleMedicineInfo(navigation, '구충제')}>
              <Image
                source={require('../../Image/wormicon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>구충제</Text>
            </TouchableOpacity>

            {/* 알레르기 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style2}
              onPress={() => handleMedicineInfo(navigation, '알레르기')}>
              <Image
                source={require('../../Image/allergyicon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>알레르기</Text>
            </TouchableOpacity>

            {/* 소염제 버튼 */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style2}
              onPress={() => handleMedicineInfo(navigation, '이비과용제')}>
              <Image
                source={require('../../Image/noseicon.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '10%', fontSize: 20, fontWeight: 'bold'}}>
                이비과용제
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style2}
              onPress={() => handleMedicineInfo(navigation, '제산제')}>
              <Image
                source={require('../../Image/pillicon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>제산제</Text>
            </TouchableOpacity>

            {/* 땀 약 버튼 (추가됨) */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleAntiInfo(navigation)} // 임시로 소염제 핸들러 사용
            >
              <Image
                source={require('../../Image/pillicon.png')}
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
