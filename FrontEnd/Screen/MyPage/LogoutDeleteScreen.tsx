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
            <Text style={styles.modalTitle}>설정</Text>
            <Text style={styles.modalMessage}>
              로그아웃 또는 회원 탈퇴를 선택하세요.
            </Text>
            <View style={styles.modalButtons}>
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
            </View>
            <Pressable
              style={styles.cancelButton}
              onPress={goBackToPreviousScreen}>
              <Text style={styles.cancelButtonText}>닫기</Text>
            </Pressable>
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
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#3AA8F8',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutDeleteScreen;
