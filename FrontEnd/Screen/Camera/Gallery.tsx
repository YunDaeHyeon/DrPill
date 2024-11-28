//갤러리 화면입니다.

import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const Gallery = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    chooseImage(); // 컴포넌트가 마운트될 때 갤러리 열기
  }, []);

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        navigation.goBack();
        return; // 선택을 취소했을 때 아무런 작업도 하지 않음
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 20,
  },
});

export default Gallery;
