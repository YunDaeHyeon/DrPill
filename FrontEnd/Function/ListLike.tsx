import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Config from 'react-native-config';

export const MedicineListBox = ({selectedItem}) => {
  const [isHeartFull, setIsHeartFull] = useState(false); // 하트 초기 상태
  const [loading, setLoading] = useState(true); // 서버 요청 상태

  // 초기 상태 설정: 서버에서 즐겨찾기 여부 확인
  const fetchFavoriteStatus = async () => {
    setLoading(true); // 로딩 시작
    const result = await AsyncStorage.getItem('userId');
    const uid = Number(result); // 사용자 ID

    try {
      const response = await axios.get(
        `${Config.AUTH_SERVER_URL}/favorite-get`,
        {
          params: {uid},
        },
      );

      // 서버에서 즐겨찾기된 약물 목록 확인
      const isFavorite = response.data.some(
        medicine => medicine.itemSeq === selectedItem.itemSeq,
      );

      setIsHeartFull(isFavorite); // 초기 상태 설정
    } catch (error) {
      console.error('즐겨찾기 상태 확인 실패:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 즐겨찾기 클릭 핸들러
  const changeHeart = async () => {
    const result = await AsyncStorage.getItem('userId');
    const uid = Number(result); // 사용자 ID

    try {
      if (isHeartFull) {
        // 즐겨찾기 제거
        const response = await axios.delete(
          `${Config.AUTH_SERVER_URL}/favorite-remove`,
          {
            data: {
              uid,
              itemSeq: selectedItem.itemSeq,
            },
          },
        );
        console.log('즐겨찾기 제거 성공:', response.data);
      } else {
        // 즐겨찾기 추가
        const response = await axios.post(
          `${Config.AUTH_SERVER_URL}/favorite-medicine`,
          {
            uid,
            itemSeq: selectedItem.itemSeq,
            itemName: selectedItem.itemName,
            itemImage: selectedItem.itemImage || '',
            entpName: selectedItem.entpName,
            efcyQesitm: selectedItem.efcyQesitm,
            useMethodQesitm: selectedItem.useMethodQesitm,
            atpnQesitm: selectedItem.atpnQesitm,
            seQesitm: selectedItem.seQesitm,
            depositMethodQesitm: selectedItem.depositMethodQesitm,
          },
        );
        console.log('즐겨찾기 추가 성공:', response.data);
      }

      setIsHeartFull(!isHeartFull); // 상태 변경
    } catch (error) {
      console.error('즐겨찾기 처리 실패:', error);
      Alert.alert('오류', error.response?.data?.error || '서버 요청 실패');
    }
  };

  // 컴포넌트 마운트 시 초기 상태 가져오기
  useEffect(() => {
    fetchFavoriteStatus();
  }, []);

  if (loading) {
    return null; // 로딩 중일 때 렌더링하지 않음
  }

  return (
    <TouchableOpacity onPress={changeHeart} style={styles.heart}>
      <Image
        source={
          isHeartFull
            ? require('../Image/heart_full.png') // 가득 찬 하트
            : require('../Image/heart_empty.png') // 빈 하트
        }
        style={styles.heartImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heart: {
    padding: 8,
  },
  heartImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 12,
  },
});
