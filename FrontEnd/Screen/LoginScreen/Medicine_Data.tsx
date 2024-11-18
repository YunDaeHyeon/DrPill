import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ToastAndroid,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';


const { width: deviceWidth } = Dimensions.get('window');

const Medicine_Data = ({ navigation }: { navigation: any }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [shuffledInterests, setShuffledInterests] = useState<string[]>([]);

  useEffect(() => {
    const interests = [
      '신경계',
      '감각기관',
      '알레르기',
      '순환계',
      '호흡기관',
      '소화기관',
      '호르몬',
      '비뇨기관',
      '외피용',
      '기관용',
      '자양강장',
      '혈액 및 채액 용약',
      '인공관류',
      '대사성 의약품',
      '조직부활용',
      '종양용',
      '조직세포 치료용',
      '항생물질',
      '화학요법',
      '생물학적 제제',
      '기생동물에 대한 의약품',
      '조제용약',
      '진단용약',
      '관련제품',
      '기타의 치료를 주목적으로 하지 않는 의약품',
    ];
    setShuffledInterests(interests.sort(() => Math.random() - 0.5));
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prevState) =>
      prevState.includes(interest)
        ? prevState.filter((item) => item !== interest)
        : [...prevState, interest],
    );
  };

  const handleSubmit = async () => {
    try {
      // 약 데이터 저장
      await AsyncStorage.setItem(
        'medicineInterests',
        JSON.stringify(selectedInterests),
      );
      console.log('의약품 데이터 저장:', selectedInterests);
  
      const diseaseInterests = await AsyncStorage.getItem('diseaseInterests');
      const medicineInterests = await AsyncStorage.getItem('medicineInterests');
      const userInfo = await AsyncStorage.getItem('userInfo');
  
      if (userInfo && diseaseInterests && medicineInterests) {
        const parsedUserInfo = JSON.parse(userInfo);
        const requestData = {
          email: parsedUserInfo.email,
          nickname: parsedUserInfo.nickname,
          interest_disease: JSON.parse(diseaseInterests).join(', '),
          interest_medicine: JSON.parse(medicineInterests).join(', '),
          birthday: parsedUserInfo.birthdate,
          gender: parsedUserInfo.gender,
        };
  
        console.log('최종 데이터:', JSON.stringify(requestData, null, 2)); // 확인용
  
        const response = await axios.post(`${Config.AUTH_SERVER_URL}/create-user`, requestData);
  
        if (response.status === 200 || response.status === 201) {
          console.log('서버 전송 성공:', response.data);
          ToastAndroid.showWithGravity(
            '회원가입 완료!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.navigate('Main');
        } else {
          console.error('서버 전송 실패:', response.status);
          ToastAndroid.showWithGravity(
            '서버 오류가 발생했습니다. 다시 시도해주세요.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      }
    } catch (error) {
      console.error('데이터 전송 중 오류:', error);
      ToastAndroid.showWithGravity(
        '오류가 발생했습니다. 다시 시도해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심있는 의약품</Text>
      <ScrollView>
        <View style={styles.row}>
          {shuffledInterests.map((interest, index) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => toggleInterest(interest)}
                style={[styles.interestCard, isSelected && styles.selectedCard]}>
                <View
                  style={[
                    styles.checkBox,
                    isSelected && styles.selectedCheckBox,
                  ]}>
                  {isSelected && <Text style={styles.checkText}>✔</Text>}
                </View>
                <Text style={styles.interestText}>{interest}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.footerButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleSubmit}>
          <Text style={styles.footerButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  interestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#cfcfcf',
    borderWidth: 1,
    maxWidth: deviceWidth * 0.9,
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#90caf9',
  },
  checkBox: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#bdbdbd',
  },
  selectedCheckBox: {
    backgroundColor: '#ffffff',
    borderColor: '#00796b',
  },
  checkText: {
    fontSize: 12,
    color: '#00796b',
  },
  interestText: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 16,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00796b',
    borderRadius: 8,
  },
  footerButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Medicine_Data;

