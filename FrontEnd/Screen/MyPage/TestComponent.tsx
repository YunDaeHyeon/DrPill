import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LogoutDeleteScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // 화면이 로드되자마자 모달 표시
    setIsModalVisible(true);
  }, []);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn'); // 로그인 상태 초기화
      console.log('로그아웃 완료');
      closeModal();
      navigation.navigate('Login'); // 로그인 화면으로 이동
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  };

  // 회원 탈퇴 함수
  const handleAccountDeletion = async () => {
    try {
      await AsyncStorage.clear(); // 모든 사용자 데이터 삭제
      console.log('회원 탈퇴 완료');
      closeModal();
      navigation.navigate('Login'); // 로그인 화면으로 이동
    } catch (error) {
      console.error('회원 탈퇴 중 오류:', error);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalVisible(false);
    navigation.goBack(); // 이전 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      {/* 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>설정</Text>
            <Text style={styles.modalMessage}>
              로그아웃 또는 회원 탈퇴를 선택하세요.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>로그아웃</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={handleAccountDeletion}>
                <Text style={styles.deleteButtonText}>회원 탈퇴</Text>
              </Pressable>
            </View>
            <Pressable style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelButtonText}>닫기</Text>
            </Pressable>
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
});

export default LogoutDeleteScreen;
