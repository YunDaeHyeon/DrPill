// CameraModal.tsx
import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomText from '../../Function/CustomText';
// props 타입 정의
interface CameraModalProps {
  visible: boolean; // 모달의 가시성을 결정하는 boolean 값
  onClose: () => void; // 모달 닫기 함수
  onConfirm: () => void; // 확인 버튼 클릭 시 호출되는 함수
  loading: boolean; // 로딩 상태 추가
}

const CameraModal: React.FC<CameraModalProps> = ({
  visible,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#b4b4b4"
              style={{transform: [{scale: 1.5}]}}
            />
            <CustomText
              style={{color: 'white', fontWeight: 'bold', marginTop: 17}}>
              1분 정도 기다려주세요...
            </CustomText>
          </View>
        ) : (
          <View style={styles.camera_modalcontain}>
            <CustomText style={styles.camera_modaltitle}>
              찍힌 이미지가 맞습니까?
            </CustomText>
            <CustomText> </CustomText>
            <View style={styles.camera_modal_buttonContainer}>
              <TouchableOpacity
                style={styles.camera_modal_button}
                onPress={onClose}>
                <CustomText style={styles.camera_modal_buttonText}>
                  취소
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.camera_modal_button}
                onPress={onConfirm}>
                <CustomText style={styles.camera_modal_buttonText}>
                  확인
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // 모달을 바닥에 위치시킴
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게
  },

  loadingContainer: {
    position: 'absolute',
    marginTop: '98%',
    marginLeft: '33%',
  },

  camera_modalcontain: {
    position: 'absolute',
    marginTop: '166%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  camera_modaltitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  camera_modal_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camera_modal_button: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3499E2',
    margin: 5,
    borderRadius: 5,
  },
  camera_modal_buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CameraModal;
