import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const TestComponent = () => {
  const navigation = useNavigation();

  // 로그아웃 함수
  const handleLogout = async () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn'); // 로그인 상태 초기화
              console.log('로그아웃 완료');
              navigation.navigate('Login'); // 로그인 화면으로 이동
            } catch (error) {
              console.error('로그아웃 중 오류:', error);
            }
          },
        },
      ],
    );
  };

  // 회원 탈퇴 함수
  const handleAccountDeletion = async () => {
    Alert.alert(
      '회원 탈퇴',
      '회원 정보를 삭제하고 탈퇴하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              // 모든 사용자 관련 정보 삭제
              await AsyncStorage.removeItem('userProfile');
              await AsyncStorage.removeItem('userInfo');
              await AsyncStorage.removeItem('diseaseInterests');
              await AsyncStorage.removeItem('medicineInterests');
              console.log('회원 탈퇴 완료');
              navigation.navigate('Login'); // 로그인 화면으로 이동
            } catch (error) {
              console.error('회원 탈퇴 중 오류:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleAccountDeletion}>
        <Text style={styles.buttonText}>회원 탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#3AA8F8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default TestComponent;
