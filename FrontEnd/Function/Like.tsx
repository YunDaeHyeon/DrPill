import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

export const PillBox = () => {
  const [isHeartFull, setIsHeartFull] = useState(true);

  const changeHeart = () => {
    setIsHeartFull(!isHeartFull); // 상태를 변경하여 이미지 전환
  };

  return (
    <TouchableOpacity
      onPress={changeHeart}
      style={Styles.heart_icon_touch_view}>
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

const Styles = StyleSheet.create({
  heart_icon_touch_view: {
    //하트 아이콘 터치뷰
    marginLeft: 105,
    marginBottom: 90,
  },
});
