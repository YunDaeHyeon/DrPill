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

const { width: deviceWidth } = Dimensions.get('window');

const Disease_Data = ({ navigation }: { navigation: any }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [shuffledInterests, setShuffledInterests] = useState<string[]>([]);

  useEffect(() => {
    const loadInterests = async () => {
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

      // AsyncStorage에서 이전 선택 데이터 불러오기
      const savedInterests = await AsyncStorage.getItem('diseaseInterests');
      if (savedInterests) {
        setSelectedInterests(JSON.parse(savedInterests));
      }
    };

    loadInterests();
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prevState) =>
      prevState.includes(interest)
        ? prevState.filter((item) => item !== interest)
        : [...prevState, interest],
    );
  };

  const handleNext = async () => {
    if (selectedInterests.length === 0) {
      ToastAndroid.showWithGravity(
        '관심있는 질환을 선택해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    try {
      await AsyncStorage.setItem('diseaseInterests', JSON.stringify(selectedInterests));
      console.log('질환 데이터 저장:', selectedInterests);
      navigation.navigate('Medicine_Data');
    } catch (error) {
      console.error('질환 데이터 저장 중 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심있는 질환</Text>
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
        <TouchableOpacity style={styles.footerButton} onPress={handleNext}>
          <Text style={styles.footerButtonText}>다음</Text>
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

export default Disease_Data;




