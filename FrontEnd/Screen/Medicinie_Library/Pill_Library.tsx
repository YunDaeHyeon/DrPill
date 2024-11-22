//약 도서관 화면
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal, // 모달창 표시를 위한 컴포넌트 
  ScrollView,
  Button,
  Dimensions, // 화면 크기 정보 가져오기 
} from 'react-native';
import {PillBox} from '../../Function/Like';
import {NavigationBar} from '../Commonness/NavigationBar';
import Config from 'react-native-config'; // 환경 변수 관리 

// 테스트 데이터
const test_data = [
  {
    id: 1,
    title: '약 1',
    effect: '효능 1',
    usege: '사용법 1',
    caution: '주의사항 1',
  },
  {
    id: 2,
    title: '약 2',
    effect: '효능2',
    usege: '사용법 2',
    caution: '주의사항 2',
  },
  {
    id: 3,
    title: '약 3',
    effect: '효능 3',
    usege: '사용법 3',
    caution: '주의사항 3',
  },
  {
    id: 4,
    title: '약 4',
    effect: '효능 4',
    usege: '사용법 4',
    caution: '주의사항 4',
  },
  {
    id: 5,
    title: '약 5',
    effect: '효능 5',
    usege: '사용법 5',
    caution: '주의사항 5',
  },
  {
    id: 6,
    title: '약 6',
    effect: '효능 6',
    usege: '사용법 6',
    caution: '주의사항 6',
  },
  {
    id: 7,
    title: '약 7',
    effect: '효능 7',
    usege: '사용법 7',
    caution: '주의사항 7',
  },
  {
    id: 8,
    title: '약 8',
    effect: '효능 8',
    usege: '사용법 8',
    caution: '주의사항 8',
  },
];

// 화면의 가로 크기 가져오기
const screenWidth = Dimensions.get('window').width;

//Pilllibrary 컴포넌트 정의 
const PillLibrary = ({navigation}) => {

  // 선택된 약 데이터를 저장하는 상태 
  const [selectedItem, setSelectedItem] = useSstate(null); 

  // Model 핸들러
  // 모달창 열기
  const modalOpenListener = id => {
    const selectedData = test_data.find(item => item.id === id);                                   
    setSelectedItem(selectedData);
  };

  // 모달창 닫기
  const modelCloseListener = () => {
    setSelectedItem(null);
  };

  // 서버에서 관심 의약품 호출
  const callMedicineCategoryListener = async () => {
    try {
      //서버 요청 보내기 
      const response = await fetch(
        `${Config.AUTH_SERVER_URL}/favorite-medicine`,
      );
      const result = response.json(); // 응답 데이터 파싱 
      //오류 처리 
    } catch (error) {
      console.error('서버로부터 응답이 실패하였습니다. : ', error);
    }
  };

  // 화면이 렌더링 될 때 한 번 실행(useEffect 사용)
  useEffect(() => {
    callMedicineCategoryListener();
  }, []);

  return (
    <>
      {/* 메인 컨테이너 */}
      <View style={Styles.container}>
        {/* 헤더 텍스트 */}
        <Text style={Styles.pilllibrary_font}>약 도서관</Text>
        {/* 스크롤 가능한 약 목록 */}
        <ScrollView style={Styles.contain_controller}>  {/* 부모 */}
          <View style={Styles.library_contain_view}>  {/* 자식 */}
            {/* 테스트 데이터를 반복 렌더링 */}
            {test_data.map(item => (
              <TouchableOpacity
                key={item.id} // 각 아이템 고유 키 
                style={Styles.library_contain} // 약 카드 스타일 
                onPress={() => modalOpenListener(item.id)}>  {/* 클릭 시 모달 열기 */}
                <Image
                  source={require('../../Image/medicinelibrary.png')} // 약 이미지 
                  style={Styles.like_medicine_image}
                />
                <PillBox /> {/* 하트 아이콘 */}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 모달 창 */}
      <Modal
        transparent={true}  // 배경 투명 
        visible={!!selectedItem} // 선택된 약이 있으면 보이기 
        animationType="fade" // 페이드 애니메이션 
        onRequestClose={modelCloseListener}> {/* 뒤로가기 시 모달 닫기 */}
        <View style={Styles.modal_main_container}>
          <View style={Styles.modal_sub_container}>
            {selectedItem && ( // 선택된 약 정보가 있으면 표시
              <>
                <Text style={Styles.modal_title}>{selectedItem.title}</Text>
                <Text style={Styles.modal_text}>
                  효능: {selectedItem.effect}
                </Text>
                <Text style={Styles.modal_text}>
                  사용법: {selectedItem.usege}
                </Text>
                <Text style={Styles.modal_text}>
                  주의사항: {selectedItem.caution}
                </Text>
                <TouchableOpacity
                  onPress={() => modelCloseListener()}
                  style={Styles.modal_close_btn}>
                  <Text style={Styles.modal_close_btn_text}>닫기</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      {/* 네비게이션 바 */}
      <NavigationBar navigation={navigation} />
    </>
  );
};

//스타일 정의 
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // 가로 중앙 정렬 
  },

  //약 도서관 헤더 스타일 
  pilllibrary_font: {
    position: 'absolute',
    marginTop: 31,
    left: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },

  // 스크롤 뷰 컨트롤러 
  contain_controller: {
    marginTop: '25%',
    marginBottom: '5%',
  },

  // 스크롤뷰
  scrollview_contain: {
    marginTop: '25%',
    backgroundColor: 'white',
    width: '105%',
    height: '84%',
    flex: 1,
  },

  // 약 카드 컨테이너 (부모)
  library_contain_view: {
    width: 328,
    height: '100%',
    flexDirection: 'row', // 중요
    flexWrap: 'wrap', // 중요
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  // 약 카드(자식)
  library_contain: {
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
    margin: 10,
  },

  //찜한 약 사진
  like_medicine_image: {
    width: 140,
    height: 140,
    position: 'absolute',
    borderRadius: 20,
  },

  //하트 아이콘 터치뷰
  heart_icon_touch_view: {
    marginLeft: 105,
    marginBottom: 90,
  },

  // 모달 (메인 컨테이너)
  modal_main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  // 모달 (서브 컨테이너)
  modal_sub_container: {
    width: '90%',
    height: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },

  // 모달 (제목)
  modal_title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // 모달 (내용)
  modal_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  // 모달 (닫기)
  modal_close_btn: {
    position: 'absolute',
    bottom: 20,
    left: screenWidth / 2 - 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3f88bf',
    borderRadius: 5,
  },

  // 모달 (닫기 버튼 텍스트)
  modal_close_btn_text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PillLibrary;
