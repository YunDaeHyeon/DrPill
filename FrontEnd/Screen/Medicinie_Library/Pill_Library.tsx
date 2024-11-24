//약 도서관 화면입니다.
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal, // 모달창 표시를 위한 컴포넌트
  ScrollView,
  Dimensions, // 화면 크기 정보 가져오기
} from 'react-native';
import CustomText from '../../Function/CustomText';
import {PillBox} from '../../Function/Like';
import {NavigationBar} from '../Commonness/NavigationBar';
import Config from 'react-native-config'; // 환경 변수 관리
import {MedicineListBox} from '../../Function/ListLike';
import InfoModal from '../../Function/InfoModal';
import axios from 'axios';

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
  const callMedicineListener = async () => {
    try {
      const response = await axios.get(
        `${Config.AUTH_SERVER_URL}/favorite-get`,
      );
      const result = response.json();
    } catch (error) {
      console.error('서버로부터 응답이 실패하였습니다. : ', error);
    }
  };

  useEffect(() => {
    callMedicineListener();
  }, []);

  return (
    <>
      <View style={Styles.container}>
        <CustomText style={Styles.pilllibrary_font}>약 도서관</CustomText>
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
      <InfoModal
        visible={!!selectedItem}
        selectedItem={selectedItem}
        onClose={modelCloseListener}
      />
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
});

export default PillLibrary;
