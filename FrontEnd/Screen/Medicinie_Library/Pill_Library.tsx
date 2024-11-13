//약 도서관 화면입니다.
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {PillBox} from '../../Function/Like';
import {NavigationBar} from '../Commonness/NavigationBar';

const PillLibrary = ({navigation}) => {
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [isOpen4, setOpen4] = useState(false);
  const [isOpen5, setOpen5] = useState(false);
  const [isOpen6, setOpen6] = useState(false);

  const libraryModal = modalNumber => {
    switch (modalNumber) {
      case 1:
        setOpen1(!isOpen1);
        break;
      case 2:
        setOpen2(!isOpen2);
        break;
      case 3:
        setOpen3(!isOpen3);
        break;
      case 4:
        setOpen4(!isOpen4);
        break;
      case 5:
        setOpen5(!isOpen5);
        break;
      case 6:
        setOpen6(!isOpen6);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <View style={Styles.container}>
        <Text style={Styles.pilllibrary_font}>약 도서관</Text>

        <View style={Styles.library_contain_view}>
          <View style={Styles.libraryview_1}>
            <TouchableOpacity
              style={Styles.library_contain}
              onPress={() => libraryModal(1)}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.library_contain3}
              onPress={() => libraryModal(2)}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.library_contain3}
              onPress={() => libraryModal(3)}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </TouchableOpacity>
          </View>

          <View style={Styles.libraryview_2}>
            <TouchableOpacity
              style={Styles.library_contain2}
              onPress={() => libraryModal(4)}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.library_contain4}
              onPress={() => libraryModal(5)}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.library_contain4}
              onPress={() => libraryModal(6)}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <NavigationBar navigation={navigation} />

      <Modal
        transparent={true}
        visible={isOpen1}
        onRequestClose={() => libraryModal(1)}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.library_modalTitle}>약 정보1</Text>

            <ScrollView style={Styles.scrollview_contain}>
              <Text style={Styles.library_modalText}>제품명</Text>
              <Image
                source={require('../../Image/타이레놀_제품명.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>효능</Text>
              <Image
                source={require('../../Image/타이레놀_효능.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>사용법</Text>
              <Image
                source={require('../../Image/타이레놀_사용법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>주의사항</Text>
              <Image
                source={require('../../Image/타이레놀_주의사항.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>부작용</Text>
              <Image
                source={require('../../Image/타이레놀_부작용.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>보관법</Text>
              <Image
                source={require('../../Image/타이레놀_보관법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>이미지</Text>
              <Image
                source={require('../../Image/타이레놀.png')}
                style={Styles.librarymodal_image}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => libraryModal(1)}
              style={Styles.closeButton}>
              <Text style={Styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isOpen2}
        onRequestClose={() => libraryModal(2)}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.library_modalTitle}>약 정보2 </Text>

            <ScrollView style={Styles.scrollview_contain}>
              <Text style={Styles.library_modalText}>제품명</Text>
              <Image
                source={require('../../Image/타이레놀_제품명.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>효능</Text>
              <Image
                source={require('../../Image/타이레놀_효능.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>사용법</Text>
              <Image
                source={require('../../Image/타이레놀_사용법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>주의사항</Text>
              <Image
                source={require('../../Image/타이레놀_주의사항.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>부작용</Text>
              <Image
                source={require('../../Image/타이레놀_부작용.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>보관법</Text>
              <Image
                source={require('../../Image/타이레놀_보관법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>이미지</Text>
              <Image
                source={require('../../Image/타이레놀.png')}
                style={Styles.librarymodal_image}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => libraryModal(2)}
              style={Styles.closeButton}>
              <Text style={Styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isOpen3}
        onRequestClose={() => libraryModal(3)}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.library_modalTitle}>약 정보3</Text>

            <ScrollView style={Styles.scrollview_contain}>
              <Text style={Styles.library_modalText}>제품명</Text>
              <Image
                source={require('../../Image/타이레놀_제품명.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>효능</Text>
              <Image
                source={require('../../Image/타이레놀_효능.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>사용법</Text>
              <Image
                source={require('../../Image/타이레놀_사용법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>주의사항</Text>
              <Image
                source={require('../../Image/타이레놀_주의사항.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>부작용</Text>
              <Image
                source={require('../../Image/타이레놀_부작용.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>보관법</Text>
              <Image
                source={require('../../Image/타이레놀_보관법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>이미지</Text>
              <Image
                source={require('../../Image/타이레놀.png')}
                style={Styles.librarymodal_image}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => libraryModal(3)}
              style={Styles.closeButton}>
              <Text style={Styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isOpen4}
        onRequestClose={() => libraryModal(4)}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.library_modalTitle}>약 정보4 </Text>

            <ScrollView style={Styles.scrollview_contain}>
              <Text style={Styles.library_modalText}>제품명</Text>
              <Image
                source={require('../../Image/타이레놀_제품명.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>효능</Text>
              <Image
                source={require('../../Image/타이레놀_효능.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>사용법</Text>
              <Image
                source={require('../../Image/타이레놀_사용법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>주의사항</Text>
              <Image
                source={require('../../Image/타이레놀_주의사항.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>부작용</Text>
              <Image
                source={require('../../Image/타이레놀_부작용.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>보관법</Text>
              <Image
                source={require('../../Image/타이레놀_보관법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>이미지</Text>
              <Image
                source={require('../../Image/타이레놀.png')}
                style={Styles.librarymodal_image}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => libraryModal(4)}
              style={Styles.closeButton}>
              <Text style={Styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isOpen5}
        onRequestClose={() => libraryModal(5)}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.library_modalTitle}>약 정보5 </Text>

            <ScrollView style={Styles.scrollview_contain}>
              <Text style={Styles.library_modalText}>제품명</Text>
              <Image
                source={require('../../Image/타이레놀_제품명.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>효능</Text>
              <Image
                source={require('../../Image/타이레놀_효능.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>사용법</Text>
              <Image
                source={require('../../Image/타이레놀_사용법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>주의사항</Text>
              <Image
                source={require('../../Image/타이레놀_주의사항.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>부작용</Text>
              <Image
                source={require('../../Image/타이레놀_부작용.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>보관법</Text>
              <Image
                source={require('../../Image/타이레놀_보관법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>이미지</Text>
              <Image
                source={require('../../Image/타이레놀.png')}
                style={Styles.librarymodal_image}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => libraryModal(5)}
              style={Styles.closeButton}>
              <Text style={Styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isOpen6}
        onRequestClose={() => libraryModal(6)}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.library_modalTitle}>약 정보6 </Text>

            <ScrollView style={Styles.scrollview_contain}>
              <Text style={Styles.library_modalText}>제품명</Text>
              <Image
                source={require('../../Image/타이레놀_제품명.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>효능</Text>
              <Image
                source={require('../../Image/타이레놀_효능.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>사용법</Text>
              <Image
                source={require('../../Image/타이레놀_사용법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>주의사항</Text>
              <Image
                source={require('../../Image/타이레놀_주의사항.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>부작용</Text>
              <Image
                source={require('../../Image/타이레놀_부작용.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>보관법</Text>
              <Image
                source={require('../../Image/타이레놀_보관법.png')}
                style={Styles.librarymodal_image}
              />
              <Text style={Styles.library_modalText}>이미지</Text>
              <Image
                source={require('../../Image/타이레놀.png')}
                style={Styles.librarymodal_image}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => libraryModal(6)}
              style={Styles.closeButton}>
              <Text style={Styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  library_contain_view: {
    // 박스 뷰
    width: 328,
    height: 500,
    marginTop: 130,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  libraryview_1: {
    // 왼쪽 박스 뷰
    width: 185,
  },

  libraryview_2: {
    //오른쪽 박스 뷰
    width: 145,
  },

  library_contain: {
    //약도서관 박스
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  library_contain2: {
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  library_contain3: {
    width: 143,
    height: 143,
    marginTop: 35,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  library_contain4: {
    width: 143,
    height: 143,
    marginTop: 35,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  like_medicine_image: {
    //찜한 약 사진
    width: 140,
    height: 140,
    position: 'absolute',
    borderRadius: 20,
  },

  heart_icon_touch_view: {
    //하트 아이콘 터치뷰
    marginLeft: 105,
    marginBottom: 90,
  },

  pilllibrary_font: {
    //약 도서관 글씨
    position: 'absolute',
    marginTop: 50,
    left: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    //모달 컨테이너
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    //모달
    width: '90%',
    height: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  library_modalTitle: {
    //모달 제목
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    //닫는 버튼
    marginTop: '188%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3f88bf',
    borderRadius: 5,
  },
  closeButtonText: {
    //닫는 버튼 텍스트
    color: 'white',
    fontWeight: 'bold',
  },
  library_modalText: {
    //모달 텍스트
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  scrollview_contain: {
    //스크롤뷰 컨테인
    position: 'absolute',
    marginTop: '25%',
    backgroundColor: 'white',
    width: '105%',
    height: '84%',
  },

  librarymodal_image: {
    //사진
    marginLeft: 10,
    width: '95%',
  },
});

export default PillLibrary;
