import React, {useEffect} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface DetectedImageProps {
  detectedImages: Array<{image: string; label: string}> | null;
}

const cameraOn = (navigation: any) => {
  navigation.reset({
    index: 12,
    routes: [{name: 'CameraCapture'}], // 'CameraCapture' 화면으로 이동
  });
};

const DetectedImages: React.FC<DetectedImageProps> = ({detectedImages}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!detectedImages) {
      Alert.alert('이미지 검출 실패', '이미지가 검출되지 않았습니다.', [
        {
          text: '다시 찍기',
          onPress: () => cameraOn(navigation),
        },
      ]);
    } else if (detectedImages.length > 4) {
      Alert.alert('알림', '약은 최대 4개까지만 검출 가능합니다.', [
        {
          text: '확인',
          onPress: () => cameraOn(navigation),
        },
      ]);
    } else if (detectedImages.length > 0) {
      //MedicineCheck로 이동
      navigation.navigate('MedicineCheck', {images: detectedImages});
    }
  }, [detectedImages, navigation]);
};

export default DetectedImages;
