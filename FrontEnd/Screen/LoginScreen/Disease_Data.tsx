import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ToastAndroid,
  PanResponder,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../Function/CustomText';
import axios from 'axios';
import Config from 'react-native-config';
import {interestDisease} from '../../Function/interests_disease';

const {width: deviceWidth} = Dimensions.get('window');

const Disease_Data = ({navigation}: {navigation: any}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [shuffledInterests, setShuffledInterests] = useState<string[]>([]);
  const animatedHeight = useRef(new Animated.Value(100)).current; // 초기 높이 (collapsed 상태)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10; // 수직 드래그 시 응답
      },
      onPanResponderMove: (_, gestureState) => {
        const newHeight = Math.max(100, Math.min(400, 100 + gestureState.dy)); // 최소/최대 높이 설정
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          // 위로 드래그 -> 확장
          Animated.spring(animatedHeight, {
            toValue: 400, // 확장된 높이
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 50) {
          // 아래로 드래그 -> 축소
          Animated.spring(animatedHeight, {
            toValue: 100, // 축소된 높이
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    const loadInterests = async () => {
      setShuffledInterests(interestDisease.sort(() => Math.random() - 0.5));

      // AsyncStorage에서 이전 선택 데이터 불러오기
      const savedInterests = await AsyncStorage.getItem('diseaseInterests');
      if (savedInterests) {
        setSelectedInterests(JSON.parse(savedInterests));
      }
    };

    loadInterests();
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prevState =>
      prevState.includes(interest)
        ? prevState.filter(item => item !== interest)
        : [...prevState, interest],
    );
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      ToastAndroid.showWithGravity(
        '관심있는 의약품을 선택해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    try {
      // 의약품 데이터 저장
      await AsyncStorage.setItem(
        'diseaseInterests',
        JSON.stringify(selectedInterests),
      );
      console.log('질환 데이터 저장:', selectedInterests);
      navigation.navigate('Main');
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
      <CustomText style={styles.title}>관심있는 질환</CustomText>
      <ScrollView>
        <View style={styles.row}>
          {shuffledInterests.map((interest, index) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => toggleInterest(interest)}
                style={[
                  styles.interestCard,
                  isSelected && styles.selectedCard,
                ]}>
                <View
                  style={[
                    styles.checkBox,
                    isSelected && styles.selectedCheckBox,
                  ]}>
                  {isSelected && (
                    <CustomText style={styles.checkText}>✔</CustomText>
                  )}
                </View>
                <CustomText style={styles.interestText}>{interest}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.selectedContainer, {height: animatedHeight}]}>
        <View style={styles.handle} />
        <ScrollView contentContainerStyle={styles.selectedContent}>
          <View style={styles.selectedRow}>
            {selectedInterests.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleInterest(item)}
                style={[styles.interestCard, styles.selectedCard]}>
                <View style={[styles.checkBox, styles.selectedCheckBox]}>
                  <CustomText style={styles.checkText}>✔</CustomText>
                </View>
                <CustomText style={styles.interestText}>{item}</CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.goBack()}>
          <CustomText style={styles.footerButtonText}>이전</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleSubmit}>
          <CustomText style={styles.footerButtonText}>완료</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'white',
  },
  title: {
    height: '8%',
    fontSize: 24,
    marginLeft: 20,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5,
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
  selectedContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0', // 카드지갑 배경 회색
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
  selectedContent: {
    paddingHorizontal: 16,
    paddingBottom: 60, // footer 영역 침범 방지
  },
  divider: {
    width: '70%', // 화면의 70%만 차지
    height: 2, // 두께
    backgroundColor: '#d3d3d3', // 회색 (light gray)
    alignSelf: 'center', // 좌우측 기준 중앙 정렬
    marginBottom: 8, // 구분선을 아래 컨텐츠와 약간 띄움
  },
  selectedRow: {
    flexDirection: 'row', // 선택된 요소를 가로로 정렬
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 8,
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
    borderColor: '#3499E2',
  },
  checkText: {
    fontSize: 12,
    color: '#3499E2',
  },
  interestText: {
    fontSize: 14,
  },
  footer: {
    position: 'absolute', // 화면 하단에 고정
    bottom: 0,
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  footerButton: {
    width: 70,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3499E2',
    borderRadius: 8,
  },
  footerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Disease_Data;

// 서버로 데이터 전송 준비
// const diseaseInterests = await AsyncStorage.getItem('diseaseInterests');
// const userInfo = await AsyncStorage.getItem('userInfo');

// if (userInfo && diseaseInterests) {
//   const parsedUserInfo = JSON.parse(userInfo);
//   const requestData = {
//     email: parsedUserInfo.email,
//     nickname: parsedUserInfo.nickname,
//     interest_disease: JSON.parse(diseaseInterests).join(', '),
//     interest_medicine: selectedInterests.join(', '),
//     birthday: parsedUserInfo.birthdate,
//     gender: parsedUserInfo.gender,
//   };

//   console.log('최종 데이터:', JSON.stringify(requestData, null, 2));

//   const response = await axios.post(`${Config.AUTH_SERVER_URL}/create-user`, requestData);

//   if (response.status === 200 || response.status === 201) {
//     console.log('서버 전송 성공:', response.data);
//     ToastAndroid.showWithGravity(
//       '회원가입 완료!',
//       ToastAndroid.SHORT,
//       ToastAndroid.BOTTOM,
//     );
//     navigation.navigate('Main');
//   } else {
//     console.error('서버 전송 실패:', response.status);
//     ToastAndroid.showWithGravity(
//       '서버 오류가 발생했습니다. 다시 시도해주세요.',
//       ToastAndroid.SHORT,
//       ToastAndroid.BOTTOM,
//     );
//   }
// }

// {selectedInterests.length > 0 && (
//   <View style={styles.selectedContainer}>
//     {/* 상단 구분선 */}
//     <View style={styles.divider} />
//     <ScrollView>
//       <View style={styles.selectedRow}>
//         {selectedInterests.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => toggleInterest(item)}
//             style={[styles.interestCard, styles.selectedCard]}>
//             <View style={[styles.checkBox, styles.selectedCheckBox]}>
//               <Text style={styles.checkText}>✔</Text>
//             </View>
//             <Text style={styles.interestText}>{item}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   </View>
// )}
