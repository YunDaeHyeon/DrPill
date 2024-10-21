import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';

const DetectedImages = ({detectedImages}) => {
  if (!detectedImages || detectedImages.length === 0) {
    return null; // 감지된 이미지가 없을 경우 렌더링하지 않음
  }

  return (
    <ScrollView>
      <View style={{padding: 16}}>
        {detectedImages.map((item, index) => (
          <View key={index} style={{marginBottom: 20}}>
            <Text>{item.label}</Text>
            <Image
              source={{uri: `data:image/jpeg;base64,${item.image}`}} // Base64 이미지를 렌더링
              style={{
                width: 400,
                height: 400,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="contain" // 이미지 비율 유지
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default DetectedImages;
