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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>음성 기능</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePlayTTS}
            disabled={isPlaying}>
            <Text style={styles.buttonText}>
              {isPlaying ? '실행 중...' : '실행'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: '#FF5555'}]}
            onPress={handleStopTTS}
            disabled={!isPlaying}>
            <Text style={styles.buttonText}>실행 종료</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionButton: {
    width: '100%',
    paddingVertical: 15,
    marginVertical: 5,
    backgroundColor: '#3499E2',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButton: {
    width: '100%',
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#555',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AudioTts;
