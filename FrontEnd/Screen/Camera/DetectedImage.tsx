import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';

interface DetectedImagesProps {
  detectedImages: {label: string; image: string}[]; // label과 image를 포함하는 배열
}

const DetectedImages: React.FC<DetectedImagesProps> = ({detectedImages}) => {
  return (
    <ScrollView style={styles.container}>
      {detectedImages.map((detectedImage, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image
            source={{uri: `data:image/jpeg;base64,${detectedImage.image}`}}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.label}>{detectedImage.label}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  imageContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default DetectedImages;
