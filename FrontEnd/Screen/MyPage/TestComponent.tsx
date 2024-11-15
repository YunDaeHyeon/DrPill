import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// 디바이스 가로 길이
const {width: deviceWidth} = Dimensions.get('window');

const TestComponent = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [shuffledInterests, setShuffledInterests] = useState<string[]>([]);

  useEffect(() => {
    const interests = [
      '감염성',
      '종양류',
      '혈액, 조혈기관, 면역계',
      '내분비계, 영양, 대사',
      '정신 및 행동장애',
      '신경계',
      '눈 또는 유양돌기',
      '순환계',
      '호흡계',
      '소화계',
      '치과',
      '피부 및 피하조직',
      '근육계, 골격계, 결합조직',
      '배설계',
      '생식계',
      '임신, 출산, 산후',
      '출생전후기',
      '기형, 선천적, 유전',
      '손상, 중독',
      '그 외, 이상소견, 분류 없음',
    ];
    setShuffledInterests(interests.sort(() => Math.random() - 0.5));
  }, []);

  const toggleInterest = interest => {
    setSelectedInterests(prevState => {
      const updatedState = prevState.includes(interest)
        ? prevState.filter(item => item !== interest)
        : [...prevState, interest];

      // 체크박스 값 확인
      console.log(updatedState);
      return updatedState;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심있는 질환</Text>
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
});

export default TestComponent;
