//카메라 화면입니다.
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import CustomText from '../../Function/CustomText';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {handleGAllery} from '../../Function/Navigation';
import CameraModal from './CameraModal';
import DetectedImages from './DetectedImage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions'; // react-native-permissions 라이브러리
import {NavigationBar} from '../Commonness/NavigationBar';

const backHome = (navigation: any) => {
  navigation.reset({
    index: 2,
    routes: [{name: 'Main'}], // CameraCapture 화면으로 이동
  });
};

const CameraCapture = ({navigation}) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const device = useCameraDevice('back'); // 초기 카메라 장치 설정
  const camera = useRef<Camera | null>(null); // 카메라 참조
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null); // 캡처된 사진의 URI 저장
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 추가
  const [photoPath, setPhotoPath] = useState<string | null>(null); // 사진 경로 상태 추가
  // 검출된 사진(base64) 정보 저장
  const [detectedImages, setDetectedImages] = useState([]); // 검출된 이미지 상태
  const [loading, setLoading] = useState(false); // 로딩
  const [showModal, setShowModal] = useState(true); // 팝업 표시 여부 상태 추가

  // 카메라 권한 확인 및 요청 함수
  const checkCameraPermission = async () => {
    const permissionType =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    try {
      // 현재 권한 상태 확인
      const status = await check(permissionType);
      console.log('현재 카메라 권한 상태:', status);

      switch (status) {
        case RESULTS.GRANTED:
          setCameraPermission(true); // 권한이 부여된 경우
          break;
        case RESULTS.DENIED:
          // 권한이 거부된 경우 다시 요청
          const requestStatus = await request(permissionType);
          setCameraPermission(requestStatus === RESULTS.GRANTED);
          break;
        case RESULTS.BLOCKED:
          // "다시 묻지 않음"으로 인해 차단된 경우
          Alert.alert(
            '카메라 권한 필요',
            '카메라를 사용하려면 설정에서 권한을 활성화해주세요.',
            [
              {text: '취소', style: 'cancel'},
              {
                text: '설정으로 이동',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
          setCameraPermission(false);
          break;
        default:
          setCameraPermission(false);
      }
    } catch (error) {
      console.error('카메라 권한 확인 중 오류 발생:', error);
      setCameraPermission(false);
    }
  };

  // 컴포넌트가 마운트될 때 권한 확인
  useEffect(() => {
    checkCameraPermission();
  }, []);

  // 권한 상태에 따른 렌더링
  if (cameraPermission === null) {
    return <CustomText>카메라 권한 확인 중...</CustomText>;
  } else if (!cameraPermission) {
    return (
      <CustomText>
        카메라 권한이 부여되지 않았습니다. 설정에서 활성화해주세요.
      </CustomText>
    );
  }

  // 카메라 장치가 없는 경우
  if (!device) {
    return <CustomText>카메라 장치가 없습니다.</CustomText>;
  }

  // 사진 촬영 함수
  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error('카메라가 유효하지 않습니다.', camera);
        return;
      }
      const photo = await camera.current.takePhoto(); // 사진 촬영
      console.log('image', photo);

      if (photo) {
        // 캡쳐된 이미지 경로 저장
        const filePath = `file://${photo.path}`;
        setCapturedPhoto(filePath); // 사진의 경로를 상태에 저장
        setPhotoPath(filePath);
        setModalVisible(true);
      } else {
        console.error('사진이 정의되지 않거나 비어있습니다');
      }
    } catch (error) {
      console.error('사진 촬영 중 오류 발생', error);
    }
  };

  const handleConfirm = async () => {
    if (photoPath) {
      try {
        await uploadPhoto(photoPath);
        setModalVisible(false); // 모달 닫기
        setCapturedPhoto(null); // 캡처된 사진 초기화
        setPhotoPath(null); // 사진 경로 초기화
      } catch (error) {
        console.error('사진 전송 중 오류가 발생하였습니다.', error);
      }
    }
  };

  // 서버로 이미지 전송
  const uploadPhoto = async (filePath: string) => {
    const payLoad = new FormData();
    payLoad.append('photo', {
      uri: filePath,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    setLoading(true);

    try {
      const response = await fetch(
        'http://ec2-43-203-17-224.ap-northeast-2.compute.amazonaws.com:5000/upload-image',
        {
          method: 'POST',
          body: payLoad,
          headers: {},
        },
      );

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('서버에서의 응답 : ', result);
        const base64Images = result.images;
        setDetectedImages(base64Images);
      } else {
        const result = await response.text();
        console.warn('서버에서 예상치 못한 응답을 받았습니다: ', result);
      }

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.statusText}`);
      }
      setLoading(false);
    } catch (error) {
      console.error('서버로의 전송이 실패하였습니다. : ', error);
    }
  };

  return (
    <>
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
              ref={camera}
              device={device}
              isActive={true}
              photo={true}
              video={true}
            />
            <TouchableOpacity
              style={styles.back_touch_view}
              onPress={() => backHome(navigation)}>
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

        <CameraModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirm}
          loading={loading}
        />

        <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <CustomText style={styles.modalText}>촬영 Tip</CustomText>
              <CustomText style={styles.modalMessage}>
                1. 밝은 곳에서 촬영해 주세요 {'\n'}
                2. 초점을 잘 맞춰주세요 {'\n'}
                3. 약의 글씨가 보이도록 촬영해 주세요{'\n'}
                4. 약의 글씨가 거꾸로 되면 안 돼요!❌
              </CustomText>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}>
                <CustomText style={styles.modalButtonText}>
                  네, 이해했습니다.
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <DetectedImages detectedImages={detectedImages} />
      </View>
      <NavigationBar navigation={navigation} />
    </>
  );
};

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

  caution_message: {
    position: 'absolute',
    //textAlign: 'center',
    width: '120%',
    marginTop: '1%',
    marginLeft: -30,
    color: 'black',
    fontSize: 20,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3499E2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CameraCapture;
