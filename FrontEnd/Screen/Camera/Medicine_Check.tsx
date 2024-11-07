import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import DetectedImages from './DetectedImage';

interface DetectedImageType {
  label: string;
  image: string;
}

interface MedicineCheckProps {
  detectedImages: DetectedImageType[];
}

const MedicineCheck: React.FC<MedicineCheckProps> = ({detectedImages}) => {
  if (!detectedImages || detectedImages.length === 0) return null; // 이미지가 없으면 아무것도 렌더링하지 않음

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {detectedImages.map((item, index) => (
          <DetectedImages key={index} label={item.label} image={item.image} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default MedicineCheck;
