import React, {useContext, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MedicineListContext} from './MainListContext';
import Config from 'react-native-config';

export const MedicineListBox = () => {
  const medicineListContext = useContext(MedicineListContext);

  if (!medicineListContext) {
    throw new Error(
      'MedicineListContext must be used within a MedicineListProvider',
    );
  }

  const {selectedImage, addImageToLibrary} = medicineListContext; // Context에서 함수와 데이터 추출
  const [isHeartFull, setIsHeartFull] = useState(false);

  async function conn() {
    try {
      const response = await fetch(
        `${Config.AUTH_SERVER_URL}/favorite-medicine`,
      );
      console.log(response);
      return 1;
    } catch (error) {
      console.error('서버로부터 응답이 실패하였습니다. : ', error);
    }
  }

  const test = conn();
  console.log(test);

  const changeHeart = () => {
    setIsHeartFull(!isHeartFull); // 상태를 변경하여 하트 이미지 전환
    if (selectedImage && addImageToLibrary) {
      addImageToLibrary(selectedImage); // 선택된 이미지를 약 도서관에 추가
    }
  };

  return (
    <TouchableOpacity onPress={changeHeart} style={Styles.heart}>
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
    position: 'absolute',
    marginLeft: '100%',
    marginTop: 12,
  },
});
