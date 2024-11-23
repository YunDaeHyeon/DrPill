import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Kakao_PopUp} from './Login_Success';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {handleTestComponent} from '../../Function/Navigation';

const Login = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        if (userProfile) {
          navigation.navigate('Main'); // 로그인 상태가 있으면 메인 화면으로 이동
        }
      } catch (error) {
        console.error('로그인 상태 확인 중 오류:', error);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  // Toast 메시지 표시
  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  // 카카오 로그인 처리
  const handleKakaoLogin = async () => {
    setLoading(true);
    try {
      const existingUserProfile = await AsyncStorage.getItem('userProfile');
      let parsedExistingUser = null;

      if (existingUserProfile) {
        parsedExistingUser = JSON.parse(existingUserProfile);
        console.log('저장된 사용자 정보:', parsedExistingUser);
      }

      const isSuccess = await Kakao_PopUp();
      if (isSuccess) {
        const storedData = await AsyncStorage.getItem('userProfile');
        if (storedData) {
          const {nickname, email} = JSON.parse(storedData);
          console.log('카카오에서 가져온 프로필:', {nickname, email});

          if (
            parsedExistingUser &&
            parsedExistingUser.nickname === nickname &&
            parsedExistingUser.email === email
          ) {
            console.log('프로필이 일치합니다. 메인 화면으로 이동합니다.');
            navigation.navigate('Main');
            return;
          }

          setNickname(nickname);
          setEmail(email);
          handleOpenModal(); // 모달 열기
        }
      } else {
        showToast('카카오 로그인 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('카카오 로그인 중 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 게스트 로그인 처리
  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await AsyncStorage.multiRemove([
        'userProfile',
        'userInfo',
        'diseaseInterests',
        'medicineInterests',
      ]);
      showToast('게스트 계정으로 로그인 완료 시 정보가 제한됩니다.');
      navigation.navigate('Medicine_Data');
    } catch (error) {
      console.error('게스트 로그인 중 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 모달 열 때 기존 데이터 로드
  const handleOpenModal = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        const {nickname, email, gender, birthdate} = JSON.parse(storedUserInfo);
        setNickname(nickname || '');
        setEmail(email || '');
        setGender(gender || '');
        setBirthdate(birthdate || '');
      }
      setModalVisible(true);
    } catch (error) {
      console.error('사용자 정보 불러오기 중 오류:', error);
    }
  };

  // 사용자 정보 저장
  const handleSaveUserInfo = async () => {
    if (!gender || !birthdate) {
      const errorMessage = !gender
        ? '성별을 선택해주세요.'
        : '생년월일을 선택해주세요.';
      showToast(errorMessage);
      return;
    }

    const userInfo = {
      nickname,
      email,
      gender,
      birthdate,
    };

    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('사용자 정보 저장 완료:', userInfo);
      setModalVisible(false);
      navigation.navigate('Disease_Data');
    } catch (error) {
      console.error('사용자 정보 저장 중 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b4b4b4" />
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      ) : (
        <>
          <View style={styles.appicon}>
            <Image source={require('../../Image/AppLogo.png')} />
            <Image
              source={require('../../Image/AppName.png')}
              style={styles.appname}
            />
          </View>

          <View style={styles.button_view}>
            <TouchableOpacity
              style={styles.kakaoButton}
              activeOpacity={0.7}
              onPress={handleKakaoLogin}>
              <Image
                source={require('../../Image/kakaologo.png')}
                style={styles.login_logo}
              />
              <Text style={styles.black_text}>카카오 계정으로 로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guestButton}
              activeOpacity={0.7}
              onPress={handleGuestLogin}>
              <Image
                source={require('../../Image/guestlogo.png')}
                style={styles.login_logo}
              />
              <Text style={styles.white_text}>게스트 계정으로 로그인</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>사용자 초기 설정</Text>

            <TextInput
              value={nickname}
              editable={false}
              style={styles.input}
              placeholder="닉네임"
            />

            <TextInput
              value={email}
              editable={false}
              style={styles.input}
              placeholder="이메일"
            />

            <Picker
              selectedValue={gender}
              onValueChange={itemValue => setGender(itemValue)}
              style={styles.picker}>
              <Picker.Item label="성별 선택" value="" />
              <Picker.Item label="남성" value="남성" />
              <Picker.Item label="여성" value="여성" />
            </Picker>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {birthdate ? `생년월일: ${birthdate}` : '생년월일 선택'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={birthdate ? new Date(birthdate) : new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setBirthdate(selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveUserInfo}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  appicon: {
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 180,
  },
  appname: {
    marginTop: 12,
  },
  button_view: {
    marginTop: 80,
  },
  kakaoButton: {
    marginTop: 25,
    height: 47,
    width: 324,
    borderRadius: 21,
    backgroundColor: '#FEE500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButton: {
    marginTop: 25,
    height: 47,
    width: 324,
    borderRadius: 21,
    backgroundColor: '#3AA8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  black_text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  white_text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  login_logo: {
    position: 'absolute',
    right: '80%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  dateButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    marginTop: 15,
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
