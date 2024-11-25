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
import AsyncStorage from '@react-native-async-storage/async-storage';

// 화면의 가로 크기 가져오기
const screenWidth = Dimensions.get('window').width;

const PillLibrary = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [favoriteMedicine, setFavoriteMedicine] = useState([]); // 즐겨찾기 데이터

  // 모달창 열기
  const modalOpenListener = id => {
    const selectedData = favoriteMedicine.find(item => item.itemSeq === id);
    setSelectedItem(selectedData);
  };

  // 모달창 닫기
  const modalCloseListener = () => {
    setSelectedItem(null);
  };

  // 즐겨찾기 상태 변경 핸들러
  const handleFavoriteStatusChange = updatedItem => {
    const updatedMedicine = favoriteMedicine.map(item =>
      item.itemSeq === updatedItem.itemSeq ? updatedItem : item,
    );
    setFavoriteMedicine(updatedMedicine); // 상태 동기화
  };

  // 관심 의약품 호출
  const callMedicineListener = async () => {
    const result = await AsyncStorage.getItem('userId');
    const uid = Number(result); // 사용자 ID를 숫자로 변환
    try {
      const response = await axios.get(
        `${Config.AUTH_SERVER_URL}/favorite-get?uid=${uid}`,
      );
      const updatedData = response.data.map(item => ({
        ...item,
        isFavorite: true, // 항상 초기값은 즐겨찾기로 설정
      }));
      console.log('약도서관 호출');
      setFavoriteMedicine(updatedData);
    } catch (error) {
      console.error('서버로부터 응답이 실패하였습니다. : ', error);
    }
  };

  // 처음 로드 시 관심 의약품 호출
  useEffect(() => {
    callMedicineListener();
  }, []);

  return (
    <>
      <View style={Styles.container}>
        <CustomText style={Styles.pilllibrary_font}>약 도서관</CustomText>
        <ScrollView style={Styles.contain_controller}>
          <View style={Styles.library_contain_view}>
            {favoriteMedicine.map(item => (
              // PillLibrary 컴포넌트 내 수정
              <TouchableOpacity
                key={item.itemSeq}
                style={Styles.library_contain}
                onPress={() => modalOpenListener(item.itemSeq)}>
                <Image
                  source={
                    item.itemImage
                      ? {uri: item.itemImage}
                      : require('../../Image/medicinelibrary.png')
                  }
                  style={Styles.like_medicine_image}
                />
                <View style={Styles.heart_icon_touch_view}>
                  <MedicineListBox
                    selectedItem={item}
                    onFavoriteStatusChange={handleFavoriteStatusChange}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <InfoModal
        visible={!!selectedItem}
        selectedItem={selectedItem}
        onFavoriteStatusChange={handleFavoriteStatusChange}
        onClose={modalCloseListener}
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

  // 약 도서관 글씨
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

  // 약 카드 컨테이너 (부모)
  library_contain_view: {
    width: 328,
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
    alignItems: 'center', // 자식 요소를 가로 세로 중앙 정렬
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
    margin: 10,
  },

  // 찜한 약 사진
  like_medicine_image: {
    width: 143, // 부모 컨테이너 안에 맞게 크기 조정
    height: 143,
    borderRadius: 20,
  },

  // 하트 아이콘 터치뷰
  heart_icon_touch_view: {
    position: 'absolute',
    top: 10, // 카드 안에서 위쪽에 고정
    right: 10, // 카드 안에서 오른쪽에 고정
  },
});

export default PillLibrary;
