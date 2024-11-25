import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import CustomText from './CustomText';
import {MedicineListBox} from './ListLike';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {playTTS, stopTTS} from '../initializeTtsListeners';
const InfoModal = ({
  visible,
  selectedItem,
  onClose,
  onFavoriteStatusChange,
}) => {
  const [updatedSelectedItem, setUpdatedSelectedItem] = useState(selectedItem);

  useEffect(() => {
    if (visible && selectedItem) {
      setUpdatedSelectedItem(selectedItem);

      // [수정!!] 즐겨찾기 여부 확인 후 onGPT 실행
      if (selectedItem.isFavorite) {
        const onGPT = async () => {
          try {
            const response = await axios.post(
              'https://api.openai.com/v1/chat/completions',
              {
                model: 'gpt-3.5-turbo',
                messages: [
                  {
                    role: 'user',
                    content:
                      `약에 대한 효능과 주의사항을 너에게 보내면 한 문장으로 요약해줘.` +
                      `효능 : ${selectedItem.efcyQesitm}, 주의사항 : ${selectedItem.atpnQesitm}`,
                  },
                ],
              },
              {
                headers: {
                  Authorization: `Bearer ${Config.DRPILL_CHATGPT}`,
                  'Content-Type': 'application/json',
                },
              },
            );

            const data = response.data.choices[0].message.content;
            playTTS(data);
          } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            throw new Error('API 요청 실패');
          }
        };
        onGPT();
      }
    }
  }, [visible, selectedItem]);

  if (!updatedSelectedItem) {
    return null; // 데이터가 준비되지 않았을 때는 아무것도 렌더링하지 않음
  }

  const handleModalClose = () => {
    stopTTS(); // TTS 중지
    onClose(); // 부모에서 전달된 onClose 호출
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={Styles.modalMainContainer}>
        <View style={Styles.modalSubContainer}>
          <MedicineListBox
            selectedItem={updatedSelectedItem}
            onFavoriteStatusChange={newItem => {
              setUpdatedSelectedItem(newItem); // 모달 상태 업데이트
              onFavoriteStatusChange(newItem); // 부모 컴포넌트로 전달
            }}
          />
          <View style={Styles.modalbox}>
            <CustomText style={Styles.modalTitle}>
              {updatedSelectedItem?.itemName || '약 이름'}
            </CustomText>
            <View style={Styles.imagecontainer}>
              <Image
                source={{
                  uri:
                    updatedSelectedItem?.itemImage ||
                    'https://via.placeholder.com/150',
                }}
                style={Styles.libraryimage}
              />
            </View>
          </View>
          <ScrollView style={Styles.modalThdContainer}>
            <View style={Styles.infoBox}>
              <CustomText style={Styles.infoTitle}>업체명</CustomText>
              <CustomText style={Styles.infoContent}>
                {updatedSelectedItem?.entpName || '정보가 없어요 :('}
              </CustomText>
            </View>
            <View style={Styles.infoBox}>
              <CustomText style={Styles.infoTitle}>효능</CustomText>
              <CustomText style={Styles.infoContent}>
                {updatedSelectedItem?.efcyQesitm || '정보가 없어요 :('}
              </CustomText>
            </View>
            <View style={Styles.infoBox}>
              <CustomText style={Styles.infoTitle}>사용법</CustomText>
              <CustomText style={Styles.infoContent}>
                {updatedSelectedItem?.useMethodQesitm || '정보가 없어요 :('}
              </CustomText>
            </View>
            <View style={Styles.infoBox}>
              <CustomText style={Styles.infoTitle}>주의사항</CustomText>
              <CustomText style={Styles.infoContent}>
                {updatedSelectedItem?.atpnQesitm || '정보가 없어요 :('}
              </CustomText>
            </View>
            <View style={Styles.infoBox}>
              <CustomText style={Styles.infoTitle}>부작용</CustomText>
              <CustomText style={Styles.infoContent}>
                {updatedSelectedItem?.seQesitm || '정보가 없어요 :('}
              </CustomText>
            </View>
            <View style={Styles.infoBox}>
              <CustomText style={Styles.infoTitle}>보관방법</CustomText>
              <CustomText style={Styles.infoContent}>
                {updatedSelectedItem?.depositMethodQesitm || '정보가 없어요 :('}
              </CustomText>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={Styles.modalCloseBtn}
            onPress={handleModalClose}>
            <CustomText style={Styles.modalCloseBtnText}>닫기</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modalMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
  },
  modalSubContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalThdContainer: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  medicineImage: {
    width: 200, // 이미지 너비
    height: 100, // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'blue',
    borderWidth: 40,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 16,
    color: '#555',
  },
  modalCloseBtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3AA8F8',
    borderRadius: 30,
  },
  modalCloseBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  imagecontainer: {
    width: '80%', // 이미지 너비
    height: '60%', // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginBottom: 20,
    backgroundColor: 'white',
  },

  modalbox: {
    //모달 박스
    width: '100%',
    height: '25%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'gray',
    marginBottom: 15,
    marginTop: '5%',
    alignItems: 'center',
  },

  libraryimage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default InfoModal;
