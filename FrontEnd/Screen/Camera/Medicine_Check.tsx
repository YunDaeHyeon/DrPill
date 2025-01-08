import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import CustomText from '../../Function/CustomText.tsx';
import {goMain} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar.tsx';
import EditImageModal from '../../Function/EditImageModal.tsx';

const MedicineCheck = ({navigation, route}: any) => {
  const {images} = route?.params || {images: []};
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.back}
          onPress={() => goMain(navigation)}>
          <Image source={require('../../Image/home.png')} />
        </TouchableOpacity>

        {/* 상단 안내 문구 */}
        <View style={styles.greyBox}>
          <CustomText style={styles.checktext}>
            상세정보 확인을 위해 이미지를 선택해주세요 :)
          </CustomText>
        </View>

        {/* 이미지 리스트 */}
        <View style={styles.imageContainer}>
          {images?.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              onPress={() => handleImageClick(img)}>
              <Image
                source={{uri: `data:image/jpeg;base64,${img.image}`}}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <NavigationBar navigation={navigation} />

      {/* EditImageModal */}
      {selectedImage && (
        <EditImageModal
          visible={modalVisible}
          image={selectedImage.image} // Base64 이미지 데이터 전달
          shape={selectedImage.shape || ''}
          color={selectedImage.color || ''}
          descript={selectedImage.descript || ''}
          onClose={() => setModalVisible(false)}
        />
      )}
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
});

export default MedicineCheck;
