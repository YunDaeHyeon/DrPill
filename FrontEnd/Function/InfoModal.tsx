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
  const [checkVoiceSet, setCheckVoiceSet] = useState(false); // 음성 설정 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [summaryMessage, setSummaryMessage] = useState(''); // 요약된 메시지
  const [animatedText, setAnimatedText] = useState(''); // 애니메이션 중인 텍스트
  const [isPopupVisible, setIsPopupVisible] = useState(false); // 팝업 상태

  const callVoiceSet = async () => {
    const result = await AsyncStorage.getItem('check-voice');
    setCheckVoiceSet(result === 'true'); // 문자열 "true"인지 확인
  };

  useEffect(() => {
    const fetchData = async () => {
      await callVoiceSet();
      if (visible && selectedItem) {
        setUpdatedSelectedItem(selectedItem);
        console.log('음성 설정 여부 : ', checkVoiceSet);

        if (selectedItem.isFavorite && checkVoiceSet) {
          const onGPT = async () => {
            setIsLoading(true); // 요청 시작 시 로딩 상태 활성화
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
              console.log('요약 : ', data);
              playTTS(data); // TTS 실행
              setSummaryMessage(data); // 요약된 메시지를 저장
              setAnimatedText(''); // 애니메이션 텍스트 초기화
              setIsPopupVisible(true); // 팝업 표시
            } catch (error) {
              console.error('Error:', error.response?.data || error.message);
              throw new Error('API 요청 실패');
            } finally {
              setIsLoading(false); // 요청 종료 시 로딩 상태 비활성화
            }
          };
          onGPT();
        }
      }
    };

    fetchData(); // 비동기 호출
  }, [visible, selectedItem, checkVoiceSet]);

  useEffect(() => {
    if (summaryMessage && isPopupVisible) {
      let index = 0;
      const interval = setInterval(() => {
        setAnimatedText(prev => prev + summaryMessage[index]);
        index++;
        if (index >= summaryMessage.length) {
          clearInterval(interval); // 모든 글자가 표시되면 멈춤
        }
      }, 80); // ms 단위

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }
  }, [summaryMessage, isPopupVisible]);

  if (!updatedSelectedItem) {
    return null; // 데이터가 준비되지 않았을 때는 아무것도 렌더링하지 않음
  }

  const handleModalClose = () => {
    stopTTS(); // TTS 중지
    setIsPopupVisible(false); // 팝업 닫기
    setSummaryMessage(''); // 요약된 메시지 초기화
    onClose(); // 부모에서 전달된 onClose 호출
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); // 팝업 닫기
    setSummaryMessage(''); // 요약된 메시지 초기화
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={Styles.modalMainContainer}>
        <View style={Styles.modalSubContainer}>
          {isLoading && (
            <View style={Styles.loadingOverlay}>
              <CustomText style={Styles.loadingText}>요약중...</CustomText>
            </View>
          )}
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
        {isPopupVisible && (
          <View style={Styles.popupContainer}>
            <View style={Styles.popupHeader}>
              <CustomText style={Styles.popupTitle}>💡 요약된 정보</CustomText>
              <TouchableOpacity
                onPress={handlePopupClose}
                style={Styles.popupCloseBtn}>
                <CustomText style={Styles.popupCloseText}>X</CustomText>
              </TouchableOpacity>
            </View>
            <View style={Styles.popupContent}>
              <CustomText style={Styles.popupText}>{animatedText}</CustomText>
            </View>
          </View>
        )}
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
    elevation: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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

  // 팝업
  popupContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: 'row', // 좌우 정렬
    justifyContent: 'space-between', // 제목과 닫기 버튼 양쪽 배치
    alignItems: 'center', // 세로 중앙 정렬
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  popupContent: {
    marginTop: 10, // 제목과 메시지 사이 여백
  },
  popupText: {
    color: 'black',
    fontSize: 14,
  },
  popupCloseBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  popupCloseText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default InfoModal;
