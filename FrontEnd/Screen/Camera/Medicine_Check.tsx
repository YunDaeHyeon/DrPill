//약 구별 화면입니다
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {goMain} from '../../Function/Navigation.tsx';

const MedicineCheck = ({navigation, route}: any) => {
  const {images} = route?.params || {images: []};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => goMain(navigation)}>
        <Image source={require('../../Image/home.png')} />
      </TouchableOpacity>

      <View style={styles.row1}>
        <TouchableOpacity>
          <View style={styles.Medicine1}>
            {images?.[0] && (
              <Image
                source={{uri: `data:image/jpeg;base64,${images[0].image}`}}
                style={styles.image}
              />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.Medicine2}>
            {images?.[1] && (
              <Image
                source={{uri: `data:image/jpeg;base64,${images[1].image}`}}
                style={styles.image}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.row2}>
        <TouchableOpacity>
          <View style={styles.Medicine3}>
            {images?.[2] && (
              <Image
                source={{uri: `data:image/jpeg;base64,${images[2].image}`}}
                style={styles.image}
              />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.Medicine4}>
            {images?.[3] && (
              <Image
                source={{uri: `data:image/jpeg;base64,${images[3].image}`}}
                style={styles.image}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Text>상세정보를 확인을 위해 이미지를 선택해주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
    marginTop: 220,
    backgroundColor: 'white',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
    marginTop: 60,
    backgroundColor: 'white',
  },
  Medicine1: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  Medicine2: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  Medicine3: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  Medicine4: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  back: {
    position: 'absolute',
    left: 30,
    marginTop: 70,
  },
});

export default MedicineCheck;
