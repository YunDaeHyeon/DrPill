import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  Text,
} from 'react-native';
import CustomText from '../../Function/CustomText.tsx';
import {goMain} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar.tsx';
import EditImageModal from '../../Function/EditImageModal.tsx';

const MedicineCheck = ({navigation, route}: any) => {
  const {images} = route?.params || {images: []};
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');
  const [descript, setDescript] = useState('');
  const [editedImages, setEditedImages] = useState<number[]>([]); // 수정된 이미지 인덱스 저장

  const handleImageClick = (image: any, index: number) => {
    if (editedImages.includes(index)) {
      // 수정된 이미지 클릭 시 확인창 표시
      Alert.alert(
        '이미지 수정',
        '이미 수정을 완료한 이미지입니다. 다시 수정하시겠습니까?',
        [
          {text: '아니오', style: 'cancel'},
          {
            text: '예',
            onPress: () => {
              setSelectedImage(image);
              setShape(image.shape || '');
              setColor(image.color || '');
              setDescript(image.descript || '');
              setModalVisible(true);
            },
          },
        ],
      );
    } else {
      // 새로운 이미지 수정
      setSelectedImage(image);
      setShape(image.shape || '');
      setColor(image.color || '');
      setDescript(image.descript || '');
      setModalVisible(true);
    }
  };

  const handleSave = () => {
    // 현재 이미지의 인덱스를 editedImages 배열에 추가
    const imageIndex = images.indexOf(selectedImage);
    setEditedImages(prev => [...prev, imageIndex]);
    console.log('수정된 데이터:', {shape, color, descript});
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => goMain(navigation)}>
          <Image source={require('../../Image/home.png')} />
        </TouchableOpacity>

        <View style={styles.greyBox}>
          <CustomText style={styles.checktext}>
            상세정보 확인을 위해 이미지를 선택해주세요 :)
          </CustomText>
        </View>

        <View style={styles.imageContainer}>
          {images?.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              onPress={() => handleImageClick(img, index)}>
              <View>
                <Image
                  source={{uri: `data:image/jpeg;base64,${img.image}`}}
                  style={[
                    styles.image,
                    editedImages.includes(index) && styles.editedImage, // 수정된 이미지 스타일
                  ]}
                />
                {editedImages.includes(index) && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>수정되었습니다.</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* NavigationBar */}
      <NavigationBar navigation={navigation} />

      {/* EditImageModal */}
      <EditImageModal
        visible={modalVisible}
        image={selectedImage}
        shape={shape}
        color={color}
        descript={descript}
        onShapeChange={setShape}
        onColorChange={setColor}
        onDescriptChange={setDescript}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    width: '8%',
    left: '6%',
    marginTop: '10%',
  },
  checktext: {
    fontSize: 16,
  },
  greyBox: {
    backgroundColor: '#efefef',
    marginTop: '26%',
    width: '80%',
    height: '5%',
    marginLeft: '10%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'grey',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    width: '100%',
  },
  imageWrapper: {
    width: 150,
    height: 150,
    margin: 10,
    position: 'relative', // 오버레이 배치를 위해 추가
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  editedImage: {
    opacity: 0.5, // 불투명하게 변경
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 회색 배경
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicineCheck;
