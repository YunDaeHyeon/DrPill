//카메라 화면입니다

import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {handleGAllery} from '../../Function/Navigation';
// 파일 시스템 접근
import RNFS from 'react-native-fs';

const CameraCapture = ({navigation}) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const device = useCameraDevice('back'); // 초기 카메라 장치 설정
  const camera = useRef<Camera | null>(null); // 카메라 참조
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null); // 캡처된 사진의 URI 저장

  // 카메라 권한 확인 함수
  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'authorized');
    } else {
      setCameraPermission(false);
    }
  };

  // 컴포넌트가 마운트될 때 권한 확인
  useEffect(() => {
    checkCameraPermission();
  }, []);

  // 권한 상태에 따른 렌더링
  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted.</Text>;
  }

  // 카메라 장치가 없는 경우
  if (!device) {
    return <Text>No camera device available.</Text>;
  }

  // 사진 촬영 함수
  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error('Camera reference not available.', camera);
        return;
      }
      const photo = await camera.current.takePhoto(); // 사진 촬영
      console.log('image', photo);
      if (photo) {
        // 캡쳐된 이미지 경로 저장
        const filePath = `file://${photo.path}`;
        setCapturedPhoto(filePath); // 사진의 경로를 상태에 저장
        // 서버 전송 (추후 서버로 전송할 것인지 물어보는 작업을 해야할 것 같음.)
        await uploadPhoto(filePath);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  // 서버로 이미지 전송
  const uploadPhoto = async (filePath: string) => {
    // 이미지를 전송하기 위해선 이미지의 uri과 관련된 메타데이터를 POST방식, Body에 전송해야함.
    const payLoad = new FormData();
    payLoad.append('photo', {
      uri: filePath,
      type: 'image/jpeg', // 이미지 타입
      name: 'photo.jpg', // 서버로 보낼 이미지 이름
    });
    try {
      const response = await fetch('http://192.168.41.17:5000/upload-image', {
        method: 'POST',
        body: payLoad,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log('서버에서의 응답 : ', result);
    } catch (error) {
      console.error('서버로의 전송이 실패하였습니다. : ', error);
    }
  };

  // 카메라 준비 완료 시 호출되는 함수
  const onCameraReady = (ref: Camera) => {
    camera.current = ref; // 카메라 컴포넌트에 대한 참조 설정
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_bar}></View>

      {capturedPhoto ? (
        <Image
          source={{uri: capturedPhoto}}
          style={styles.capturedImage} // 찍힌 사진을 표시
        />
      ) : (
        <View style={styles.Camera_view}>
          <Camera
            style={{
              height: 530,
              width: '100%',
              position: 'absolute',
              top: 106,
              left: 0,
              right: 0,
            }}
            device={device}
            isActive={true}
            ref={onCameraReady}
            photo={true}
            video={true}
          />
          <TouchableOpacity
            style={styles.back_touch_view}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../Image/back.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gallery_touch_view}
            onPress={() => handleGAllery(navigation)}>
            <Image source={require('../../Image/gallery.png')} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.camera_navigation_bar}>
        <TouchableOpacity activeOpacity={0.7} onPress={takePhoto}>
          <Image source={require('../../Image/shutter.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  top_bar: {
    width: '100%',
    height: 106,
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },

  capturedImage: {
    width: '100%',
    height: 530,
    resizeMode: 'contain', // 사진이 왜곡되지 않도록 조정
    position: 'absolute',
    top: 106,
  },

  back_touch_view: {
    position: 'absolute',
    width: 32,
    height: 32,
    marginTop: 130,
    left: 30,
  },

  gallery_touch_view: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 30,
    marginTop: 130,
  },

  camera_navigation_bar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    height: 147,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Camera_view: {
    width: '100%',
    height: 530, // 고정된 높이
    position: 'absolute',
  },
});

export default CameraCapture;
