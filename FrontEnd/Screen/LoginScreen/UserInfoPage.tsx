import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import CustomText from '../../Function/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const UserInfoPage = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userProfile');
        if (storedUserInfo) {
          const {nickname, email} = JSON.parse(storedUserInfo);
          setNickname(nickname || '');
          setEmail(email || '');
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 중 오류:', error);
      }
    };

    loadUserInfo();
  }, []);

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

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
      navigation.navigate('Disease_Data');
    } catch (error) {
      console.error('사용자 정보 저장 중 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>회원 가입</CustomText>

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
        <CustomText style={styles.dateText}>
          {birthdate ? `생년월일: ${birthdate}` : '생년월일 선택'}
        </CustomText>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={birthdate ? new Date(birthdate) : new Date(2000, 0, 1)}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setBirthdate(selectedDate.toISOString().split('T')[0]);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveUserInfo}>
        <CustomText style={styles.saveButtonText}>저장</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserInfoPage;
