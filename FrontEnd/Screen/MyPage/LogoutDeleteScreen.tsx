import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LogoutDeleteScreen = () => {
  const [isMainModalVisible, setIsMainModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [actionType, setActionType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setIsMainModalVisible(true);
  }, []);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      closeAllModals();
      navigation.navigate('Login');
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  };

  // 회원 탈퇴 함수
  const handleAccountDeletion = async () => {
    try {
      await AsyncStorage.clear();
      closeAllModals();
      navigation.navigate('Login');
    } catch (error) {
      console.error('회원 탈퇴 중 오류:', error);
    }
  };

  // 모든 모달 닫기
  const closeAllModals = () => {
    setIsMainModalVisible(false);
    setIsConfirmModalVisible(false);
  };

  // 추가 확인 모달 열기
  const openConfirmModal = type => {
    setActionType(type);
    setIsMainModalVisible(false);
    setIsConfirmModalVisible(true);
  };

  // 이전 화면으로 돌아가기
  const goBackToPreviousScreen = () => {
    closeAllModals();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 첫 번째 모달 */}
      <Modal
        visible={isMainModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={goBackToPreviousScreen}>
        <View style={commonStyles.modalOverlay}>
          <View style={styles.mainModalContainer}>
            <View style={styles.mainModalSubContainer}>
              <Text style={styles.mainModalTitle}>설정</Text>
              <TouchableOpacity
                style={styles.mainModalButton}
                onPress={() => openConfirmModal('logout')}>
                <Text style={styles.logoutButtonText}>로그아웃</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainModalButton}
                onPress={() => openConfirmModal('delete')}>
                <Text style={styles.deleteButtonText}>회원 탈퇴</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainModalCancelButton}
                onPress={goBackToPreviousScreen}>
                <Text style={commonStyles.cancelButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 두 번째 확인 모달 */}
      <Modal
        visible={isConfirmModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={goBackToPreviousScreen}>
        <View style={commonStyles.modalOverlay}>
          <View style={styles.confirmModalContainer}>
            <View style={styles.confirmModalSubContainer}>
              <Text style={styles.confirmModalTitle}>
                {actionType === 'logout' ? '로그아웃 확인' : '회원 탈퇴 확인'}
              </Text>
              <Text style={styles.confirmModalMessage}>
                {actionType === 'logout'
                  ? '정말 로그아웃 하시겠습니까?'
                  : '회원 정보를 삭제하고 탈퇴하시겠습니까? \n 이 작업은 되돌릴 수 없습니다.'}
              </Text>
              <View style={styles.confirmModalButtons}>
                <TouchableOpacity
                  style={styles.confirmModalCancelButton}
                  onPress={goBackToPreviousScreen}>
                  <Text style={commonStyles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmModalConfirmButton}
                  onPress={() => {
                    if (actionType === 'logout') handleLogout();
                    if (actionType === 'delete') handleAccountDeletion();
                  }}>
                  <Text style={styles.confirmButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  // 첫 번째 모달 스타일
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

  // 두 번째 모달 스타일
  confirmModalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
    height: '30%',
  },
  modalsubContainer: {
    width: '100%',
    height: '90%',

    borderRadius: 10,
  },
  confirmModalSubContainer: {
    width: '100%',
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmModalMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmModalCancelButton: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  confirmModalConfirmButton: {
    backgroundColor: '#3499E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutDeleteScreen;
