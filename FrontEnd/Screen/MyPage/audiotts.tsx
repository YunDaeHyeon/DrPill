import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  initializeTtsListeners,
  playTTS,
  stopTTS,
} from '../../initializeTtsListeners';
import CustomText from '../../Function/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioTts = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(true); // 모달 항상 열림 상태
  const [showModal, setShowModal] = useState(false);

  const handlePlayTTS = async () => {
    const textToSpeak = '음성 설정을 실행합니다.';
    initializeTtsListeners();
    await AsyncStorage.setItem('check-voice', 'true');
    console.log('음성 설정 상태 : ', await AsyncStorage.getItem('check-voice'));
    await playTTS(textToSpeak);
    setShowModal(true);
  };

  const handleStopTTS = async () => {
    const textToSpeak = '음성 설정을 종료합니다.';
    await AsyncStorage.setItem('check-voice', 'false');
    console.log('음성 설정 상태 : ', await AsyncStorage.getItem('check-voice'));
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.goBack(); // 이전 화면으로 돌아가기
  };

  return (
    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <View style={commonStyles.modalOverlay}>
        <View style={styles.mainModalContainer}>
          <View style={styles.mainModalSubContainer}>
            <CustomText style={styles.mainModalTitle}>
              음성 기능 설정
            </CustomText>
            <TouchableOpacity
              style={styles.mainModalButton}
              onPress={handlePlayTTS}>
              <CustomText style={styles.logoutButtonText}>On</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleStopTTS}
              style={styles.mainModalButton}>
              <CustomText style={styles.deleteButtonText}>Off</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainModalCancelButton}
              onPress={closeModal}>
              <CustomText style={commonStyles.cancelButtonText}>
                닫기
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(!showModal)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CustomText style={styles.modalText}>읽어주기 시작!</CustomText>
            <CustomText style={styles.modalMessage}>
              이제부터 즐겨찾기 한 약을 요약해요! {'\n'}
              요약한 약의 내용을 약선생이 읽어드려요🙂
            </CustomText>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(!showModal)} // 버튼 클릭 시 모달 닫기
            >
              <CustomText style={styles.modalButtonText}>
                네, 이해했습니다.
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const commonStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cancelButtonText: {
    color: '#555',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainModalContainer: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    height: '33%',
  },
  mainModalSubContainer: {
    width: '100%',
    flex: 1,
  },
  mainModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mainModalButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderTopColor: '#EAEAEA',
    borderTopWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  mainModalCancelButton: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'red',
  },
  deleteButtonText: {
    color: '#3499E2',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3499E2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AudioTts;
