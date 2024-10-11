/*import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

const CameraCapture = ({navigation}) => {
  const cameraRef = useRef<RNCamera | null>(null);
  // isCameraRead boolean
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        // 촬영 이미지 형식 base64 지정
        const options = {quality: 0.5, base64: true};
        // RNCamera의 takePictureAsync 함수가 반환하는 데이터의 타입을 명시
        const data = await cameraRef.current.takePictureAsync(options);
        // 촬영된 사진의 URI를 콘솔에 출력
        console.log('Picture taken:', data.uri);
      } catch (e: unknown) {
        // 오류가 실제로 Error 타입인지 확인하고 처리
        if (e instanceof Error) {
          Alert.alert(
            'Error',
            '사진을 촬영하는 중 오류가 발생하였습니다.: ' + e.message,
          );
        } else {
          Alert.alert('Error', '알 수 없는 오류가 발생하였습니다.');
        }
      }
    } else {
      Alert.alert('Error', '카메라가 준비되지 않았습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onCameraReady={() => setIsCameraReady(true)}
        onMountError={error => {
          console.error('카메라를 불러오는 중 오류 발생', error);
          Alert.alert('Error', '카메라를 초기화하는 중 오류가 발생했습니다.');
        }}
        captureAudio={false}
      />
      <TouchableOpacity style={styles.capture} onPress={takePicture}>
        <Image
          style={styles.captureIcon}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Camera_icon_%28photo%29.svg/2048px-Camera_icon_%28photo%29.svg.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  captureIcon: {
    width: 50,
    height: 50,
  },
  capturedImage: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default CameraCapture;
*/

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CameraCapture = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CameraCapture</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080', // 회색 배경
    justifyContent: 'center', // 수직으로 가운데 정렬
    alignItems: 'center', // 수평으로 가운데 정렬
  },
  text: {
    fontSize: 24,
    color: '#fff', // 흰색 텍스트
  },
});

export default CameraCapture;
