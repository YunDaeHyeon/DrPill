import React, {useState} from 'react';
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

const AudioTts = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(true); // 모달 항상 열림 상태
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTTS = async () => {
    const textToSpeak = '안녕하세요, 음성 기능이 실행되었습니다.';
    await playTTS(textToSpeak);
    setIsPlaying(true);
  };

  const handleStopTTS = () => {
    stopTTS();
    setIsPlaying(false);
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
            <CustomText style={styles.mainModalTitle}>음성 기능</CustomText>

            <TouchableOpacity style={styles.mainModalButton}>
              <TouchableOpacity onPress={handlePlayTTS} disabled={isPlaying}>
                <CustomText style={styles.logoutButtonText}>
                  {isPlaying ? '실행 중...' : '실행'}
                </CustomText>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleStopTTS}
              disabled={!isPlaying}
              style={styles.mainModalButton}>
              <CustomText style={styles.deleteButtonText}>실행 종료</CustomText>
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
    height: '28%',
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
});

export default AudioTts;
