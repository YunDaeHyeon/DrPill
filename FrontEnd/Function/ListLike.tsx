import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Config from 'react-native-config';

export const MedicineListBox = ({selectedItem}) => {
  const [isHeartFull, setIsHeartFull] = useState(); // 빈 하트

  // 즐겨찾기 클릭
  const changeHeart = async () => {
    const result = await AsyncStorage.getItem('userId');
    const uid = Number(result); // 사용자 ID를 숫자로 변환

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
            itemImage: selectedItem.itemImage,
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
      setIsHeartFull(!isHeartFull); // 상태를 변경하여 하트 이미지 전환
    } catch (error) {
      console.error('서버의 응답 : ', error);
    }
  };

  // Alert 띄우기
  const handlePress = () => {
    if (isHeartFull) {
      Alert.alert(
        '확인',
        '삭제하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '삭제',
            onPress: changeHeart, // 하트를 비우는 요청
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert(
        '확인',
        '추가하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '추가',
            onPress: changeHeart, // 하트를 채우는 요청
          },
        ],
        {cancelable: true},
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={Styles.heart}>
      <Image
        source={
          isHeartFull
            ? require('../Image/heart_full.png') // 가득 찬 하트
            : require('../Image/heart_empty.png') // 빈 하트
        }
      />
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  heart: {
    marginLeft: '80%',
    marginTop: '1%',
  },
});
