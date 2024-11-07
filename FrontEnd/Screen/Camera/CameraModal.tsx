// CameraModal.tsx
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// props 타입 정의
interface CameraModalProps {
  visible: boolean; // 모달의 가시성을 결정하는 boolean 값
  onClose: () => void; // 모달 닫기 함수
  onConfirm: () => void; // 확인 버튼 클릭 시 호출되는 함수
}

const CameraModal: React.FC<CameraModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalcontain}>
          <Text style={styles.modaltitle}>찍힌 이미지가 맞습니까?</Text>
          <Text> </Text>
          <View style={styles.modal_buttonContainer}>
            <TouchableOpacity style={styles.modal_button} onPress={onClose}>
              <Text style={styles.modal_buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modal_button} onPress={onConfirm}>
              <Text style={styles.modal_buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // 모달을 바닥에 위치시킴
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게
  },
  modalcontain: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modaltitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modal_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modal_button: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3499E2',
    margin: 5,
    borderRadius: 5,
  },
  modal_buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CameraModal; // 기본 내보내기
