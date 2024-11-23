//약 도서관 화면입니다.
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal, // 모달창 표시를 위한 컴포넌트 
  ScrollView,
  Dimensions, // 화면 크기 정보 가져오기 
} from 'react-native';
import {PillBox} from '../../Function/Like';
import {NavigationBar} from '../Commonness/NavigationBar';
import Config from 'react-native-config'; // 환경 변수 관리 

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

//Pilllibrary 컴포넌트 정의 
const PillLibrary = ({navigation}) => {
  // 데이터 상태
  const [selectedItem, setSelectedItem] = useState(null);

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

  // 관심 의약품 호출
  const callMedicineCategoryListener = async () => {
    try {
      const response = await fetch(
        `${Config.AUTH_SERVER_URL}/favorite-medicine`,
      );
      const result = response.json();
    } catch (error) {
      console.error('서버로부터 응답이 실패하였습니다. : ', error);
    }
  };

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
      
          <Text style={Styles.modalTitle}>{selectedItem?.title || '약 이름'}</Text>
          <Image
            source={require('../../Image/ty.png')}
            style={Styles.medicineImage}
          />
          <View style={Styles.infoBox}>
            <Text style={Styles.infoTitle}>보관 방법</Text>
            <Text style={Styles.infoContent}>
              {selectedItem?.effect || '기밀용기, 실온보관 (1~30°C)'}
            </Text>
          </View>
          <View style={Styles.infoBox}>
            <Text style={Styles.infoTitle}>효능효과</Text>
            <Text style={Styles.infoContent}>
              {selectedItem?.usege || '감기의 제증상 완화'}
            </Text>
          </View>
          <TouchableOpacity style={Styles.modalCloseBtn} onPress={modelCloseListener}>
            <Text style={Styles.modalCloseBtnText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
      <NavigationBar navigation={navigation} />
    </>
  );
};

const Styles = StyleSheet.create({
  container: {    
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // 가로 중앙 정렬 
  },

  //약 도서관 글씨
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  medicineImage:{
    width: 200, // 이미지 너비
    height: 100, // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginBottom: 20,

  }
});

export default PillLibrary;
