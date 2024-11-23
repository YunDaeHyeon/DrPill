import React, {useEffect, useState} from 'react';
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

const {width: deviceWidth} = Dimensions.get('window');

const Medicine_Data = ({navigation}: {navigation: any}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [shuffledInterests, setShuffledInterests] = useState<string[]>([]);

  useEffect(() => {
    const loadInterests = async () => {
      const interests = [
        '감각기관',
        '중추신경계',
        '전신마취제',
        '최면진정제',
        '항전간제',
        '해열, 진통, 소염제',
        '각성제, 흥분제',
        '진훈제',
        '정신신경용제',
        '말초신경계용약',
        '국소마취제',
        '골격근이완제',
        '자율신경제',
        '진경제',
        '발한제, 지한제',
        '감각기관용약',
        '안과용제',
        '이비과용제',
        '알레르기용약',
        '항히스타민제',
        '자격료법제',
        '순환계용약',
        '강심제',
        '부정맥용제',
        '이뇨제',
        '혈압강하제',
        '혈관보강제',
        '혈관수축제',
        '혈관확장제',
        '동맥경화용제',
        '호흡기관용약',
        '호흡촉진제',
        '진해거담제',
        '함소흡입제',
        '소화기관용약',
        '치과구강용약',
        '소화성궤양용제',
        '건위소화제',
        '제산제',
        '최토제, 진토제',
        '이담제',
        '정장제',
        '하제, 완장제',
        '호르몬제',
        '뇌하수체호르몬제',
        '수액신호르몬제',
        '갑상선, 부갑상선호르몬제',
        '단백동화스테로이드제',
        '부신호르몬제',
        '남성호르몬제',
        '난포호르몬제',
        '혼합호르몬제',
        '항문용약',
        '요로소독제',
        '자궁수축제',
        '통경제',
        '피임제',
        '성병예방제포함',
        '치질용제',
        '외피용약',
        '외피용살균소독제',
        '창상보호제',
        '화농성질환용제',
        '진양, 수렴제',
        '기생성 피부질환용제',
        '피부연화제',
        '모발용제',
        '욕제',
        '기관용 의약품',
        '대사성 의약품',
        '비타민제',
        '비타민A 및 D제',
        '비타민Bl제',
        '비타민B제',
        '비타민C 및 P제',
        '비타민E 및 K제',
        '혼합비타민제',
        '자양강장변질제',
        '칼슘제',
        '무기질제제',
        '당류제',
        '유기산제제',
        '단백아미노산제제',
        '장기제제',
        '유유아용제',
        '기타의 자양강장변질제',
        '혈액 및 체액용약',
        '혈액대용제',
        '지혈제',
        '혈액응고저지제',
        '인공관류용제',
        '인공신장관류용제',
        '간장질환용제',
        '해독제',
        '습관성중독용제',
        '통풍치료제',
        '효소제제',
        '당뇨병용제',
        '종합대사성제제',
        '조직세포의 기능용 의약품',
        '조직부활용약',
        '클로로필제제',
        '색소제제',
        '종양용약',
        '항악성종양제',
        '조직세포의 치료 및 진단 목적',
        '방사성 의약품',
        '항병원생물성 의약품',
        '항생물질제제',
        '그람양성균',
        '그람음성균',
        '항산성균',
        '그람양성균, 리케치아, 비루스',
        '그람음성균, 리케치아, 비루스',
        '곰팡이, 원충',
        '악성종양',
        '그람양성, 음성균',
        '화학료법제',
        '설화제',
        '항결핵제',
        '치나제',
        '구매제',
        '후란계 제제',
        '생물학적 제제',
        '백신류',
        '독소류 및 톡소이드류',
        '항독소 및 렙토스피라혈청류',
        '혈액제제류',
        '생물학적 시험용제제류',
        '생물학적 제제',
        '기생동물에 대한 의약품',
        '항원충제',
        '구충제',
        '조제용약',
        '부형제',
        '연고기제',
        '용해제',
        '교미교취착색제',
        '유화제',
        '기타의 조제용약',
        '진단용약',
        'X선조영제',
        '일반검사용 시약',
        '혈액검사용 시약',
        '생화학적 검사용 시약',
        '면역혈청학적 검사용 시약',
        '세균학적 검사용제',
        '병리조직검사용 시약',
        '기능검사용 시약',
        '기타의 진단용약',
        '공중위생용약',
        '방부제',
        '방역용 살균소독제',
        '방충제',
        '살충제',
        '공중위생용약',
        '관련제품',
        '캅셀류',
        '반창고',
      ];
      setShuffledInterests(interests.sort(() => Math.random() - 0.5));

      // AsyncStorage에서 이전 선택 데이터 불러오기
      const savedInterests = await AsyncStorage.getItem('medicineInterests');
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
        'medicineInterests',
        JSON.stringify(selectedInterests),
      );
      console.log('의약품 데이터 저장:', selectedInterests);
      navigation.navigate('Main');

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
                style={[
                  styles.interestCard,
                  isSelected && styles.selectedCard,
                ]}>
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
