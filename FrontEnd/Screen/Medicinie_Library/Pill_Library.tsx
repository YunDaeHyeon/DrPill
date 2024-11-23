//약 도서관 화면입니다.
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity, // 클릭 가능 영역을 제공하는 컴포넌트 
  Modal, // 팝업 화면 생성 
  ScrollView,
  Button,
  Dimensions, // 화면 크기(너비, 높이)관련 데이터를 가져오는 utility

} from 'react-native';
import {PillBox} from '../../Function/Like';
import {NavigationBar} from '../Commonness/NavigationBar';
import Config from 'react-native-config'; // 환경 변수 관리를 위한 라이브러리 import 

// 테스트 데이터, 실제 데이터가 아닌 화면 개발/디자인을 위한 임시 데이터 
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

// pilllibrary 컴포넌트 정의 (이 컴포넌트가 실제 화면에 보여짐)
const PillLibrary = ({navigation}) => {
  // **state 정의**: 상태 관리 
  // 'selectedItem'은 현재 선택된 약 데이터를 저장 
  const [selectedItem, setSelectedItem] = useState(null);

  // Model 열기 핸들러
  // 사용자가 약 아이템을 클릭했을 때 호출 됨 
  const modalOpenListener = id => {
    // 'id'에 해당되는 약 데이터를 찾아 'selectedItem'에 저장 
    const selectedData = test_data.find(item => item.id === id);
    setSelectedItem(selectedData);
  };

  // 모달창 닫기
  const modelCloseListener = () => {
    setSelectedItem(null); // 선택된 약 데이터를 초기화하여 모달창을 닫음 
  };

  // 서버로부터 관심 약품 데이터 가져오기 
  const callMedicineCategoryListener = async () => {
    try {
      const response = await fetch(
        `${Config.AUTH_SERVER_URL}/favorite-medicine`, // 서버 URL
      );
      const result = response.json(); //JSON 형식으로 변환 
    } catch (error) { 
      // 에러 발생 시 로그 출력 
      console.error('서버로부터 응답이 실패하였습니다. : ', error);
    }
  };

  //화면이 처음 렌더링 될 때 한 번만 'callMedicineCategorylistener' 함수 호출 
  useEffect(() => {
    callMedicineCategoryListener();
  }, []);

  return (
    <>
      
      <View style={Styles.container}>

        <Text style={Styles.pilllibrary_font}>약 도서관</Text>

       
        <ScrollView style={Styles.contain_controller}>
          <View style={Styles.library_contain_view}>

           
            {test_data.map(item => (
              <TouchableOpacity
                key={item.id}
                style={Styles.library_contain}
                onPress={() => modalOpenListener(item.id)}> 
                <Image
                  source={require('../../Image/medicinelibrary.png')}
                  style={Styles.like_medicine_image}
                />
                <PillBox />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      
      <Modal
      visible={!!selectedItem}
      transparent={true}
      animationType="slide"
      onRequestClose={modelCloseListener}
    >
      <View style={Styles.modalMainContainer}>
        <View style={Styles.modalSubContainer}>
          {/* 약 이름 */}
          <Text style={Styles.modalTitle}>{selectedItem?.title || '약 이름'}</Text>
          
          {/* 약 이미지 */}
          <Image
            source={require('../../Image/ty.png')} // 이미지 경로 수정
            style={Styles.medicineImage}
          />

          {/* 약 정보: 보관 방법 */}
          <View style={Styles.infoBox}>
            <Text style={Styles.infoTitle}>보관 방법</Text>
            <Text style={Styles.infoContent}>
              {selectedItem?.usege || '기밀용기, 실온보관 (1~30°C)'}
            </Text>
          </View>

          {/* 약 정보: 효능효과 */}
          <View style={Styles.infoBox}>
            <Text style={Styles.infoTitle}>효능효과</Text>
            <Text style={Styles.infoContent}>
              {selectedItem?.effect || '감기의 제증상 완화'}
            </Text>
          </View>

          <TouchableOpacity
                  onPress={() => modelCloseListener()}
                  style={Styles.modal_close_btn}>
                  <Text style={Styles.modal_close_btn_text}>닫기</Text>
                </TouchableOpacity>
        </View>
      </View>
    </Modal>
      <NavigationBar navigation={navigation} />
    </>
  );
};

// 스타일 정의 

const Styles = StyleSheet.create({
  container: {    
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  }, // 화면 레이아웃 

  //약 도서관 글씨
  pilllibrary_font: {
    position: 'absolute',
    marginTop: 31,
    left: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },

// 스크롤뷰 외부 스타일 
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

  // 약 아이템 컨테이너 스타일 (부모)
  library_contain_view: {
    width: 328,
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  // 약 아이템 개별 스타일(자식)
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

  modalMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
  },
  modalSubContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  medicineImage: {
    width: 200, // 이미지 너비
    height: 100, // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 14,
    color: '#555',
  },
  modalCloseBtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 30,
  },
  modalCloseBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },


  // // 모달 (메인 컨테이너)
  // modal_main_container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   borderColor : 'blue',
  //   borderWidth:1,
  // },

  // // 모달 내부 (서브 컨테이너)
  // modal_sub_container: {
  //   width: '90%',
  //   height: '90%',
  //   padding: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   borderColor : 'red',
  //   borderWidth:1,
  // },

  // // 모달 (제목)
  // modal_title: {
  //   color: 'black',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // // 모달 (내용)
  // modal_text: {
  //   color: 'black',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  // },
  // // 모달 (닫기)
  // modal_close_btn: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: screenWidth / 2 - 60,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   backgroundColor: '#3f88bf',
  //   borderRadius: 5,
  // },

  // // 모달 (닫기 버튼 텍스트)
  // modal_close_btn_text: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  // infoBox: {
  //   width: '100%',
  //   backgroundColor: '#f9f9f9',
  //   borderRadius: 10,
  //   padding: 15,
  //   marginBottom: 10,
  //   borderColor : 'yellow',
  //   borderWidth:1,
  // },
  // modaltite:{width:'100%',

  // },
  medicineImage:{
    width: 200, // 이미지 너비
    height: 100, // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginBottom: 20,

  }
});

export default PillLibrary;
