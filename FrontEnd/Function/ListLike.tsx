import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Config from 'react-native-config';

export const MedicineListBox = ({selectedItem, onFavoriteStatusChange}) => {
  const [isHeartFull, setIsHeartFull] = useState(selectedItem.isFavorite);
  const [loading, setLoading] = useState(false);

  const showConfirmationAlert = () => {
    Alert.alert(
      isHeartFull ? '즐겨찾기 해제' : '즐겨찾기 추가',
      isHeartFull
        ? '해당 약물을 즐겨찾기에서 삭제하시겠습니까?'
        : '해당 약물을 즐겨찾기에 추가하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '확인',
          onPress: changeHeart,
        },
      ],
    );
  };

  const changeHeart = async () => {
    setLoading(true);
    const result = await AsyncStorage.getItem('userId');
    const uid = Number(result);

    try {
      let updatedItem;
      if (isHeartFull) {
        // 즐겨찾기 제거
        await axios.delete(`${Config.AUTH_SERVER_URL}/favorite-remove`, {
          data: {uid, itemSeq: selectedItem.itemSeq},
        });
        updatedItem = {...selectedItem, isFavorite: false};
      } else {
        // 즐겨찾기 추가
        await axios.post(`${Config.AUTH_SERVER_URL}/favorite-medicine`, {
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
        });
        updatedItem = {...selectedItem, isFavorite: true};
      }

      setIsHeartFull(updatedItem.isFavorite);
      onFavoriteStatusChange(updatedItem); // 부모 컴포넌트와 상태 동기화
    } catch (error) {
      console.error('즐겨찾기 처리 실패:', error);
      Alert.alert('오류', '서버 요청 실패');
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <ActivityIndicator size="small" color="#b4b4b4" />
  ) : (
    <TouchableOpacity onPress={showConfirmationAlert} style={styles.heart}>
      <Image
        source={
          isHeartFull
            ? require('../Image/heart_full.png')
            : require('../Image/heart_empty.png')
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heart: {
    marginLeft: '80%',
    marginTop: '1%',
  },
});
