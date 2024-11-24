import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalsubContainer}>
              <Text style={styles.modalTitle}>설정</Text>
              <Pressable
                style={styles.logoutButton}
                onPress={() => openConfirmModal('logout')}>
                <Text style={styles.logoutButtonText}>로그아웃</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => openConfirmModal('delete')}>
                <Text style={styles.deleteButtonText}>회원 탈퇴</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={goBackToPreviousScreen}>
                <Text style={styles.cancelButtonText}>닫기</Text>
              </Pressable>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalsubContainer}>
              <Text style={styles.modalTitle}>
                {actionType === 'logout' ? '로그아웃 확인' : '회원 탈퇴 확인'}
              </Text>
              <Text style={styles.modalMessage}>
                {actionType === 'logout'
                  ? '정말 로그아웃 하시겠습니까?'
                  : '회원 정보를 삭제하고 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={goBackToPreviousScreen}>
                  <Text style={styles.cancelButtonText}>취소</Text>
                </Pressable>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => {
                    if (actionType === 'logout') handleLogout();
                    if (actionType === 'delete') handleAccountDeletion();
                  }}>
                  <Text style={styles.confirmButtonText}>확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '10%',
    marginLeft: '10%',
  },

  logoutButton: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '5%',
    height: '1%',
    paddingVertical: 12,

    marginHorizontal: 5,
    alignItems: 'center',
    borderTopColor: '#EAEAEA',
    borderTopWidth: 1,
  },
  logoutButtonText: {
    color: 'red',
  },
  deleteButton: {
    flex: 1,

    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',

    marginHorizontal: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#3499E2',
  },
  cancelButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  cancelButtonText: {
    color: '#555',
    textAlign: 'center',

    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#3499E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutDeleteScreen;
