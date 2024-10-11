//약 도서관 화면입니다.
import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {PillBox} from '../../Function/Like';

import {NavigationBar} from '../Commonness/NavigationBar';

const PillLibrary = ({navigation}) => {
  return (
    <>
      <View style={Styles.container}>
        <Text style={Styles.pilllibrary_font}>약 도서관</Text>

        <View style={Styles.library_contain_view}>
          <View style={Styles.libraryview_1}>
            <View style={Styles.libary_contain}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </View>
            <View style={Styles.library_contain3}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </View>
            <View style={Styles.library_contain3}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </View>
          </View>

          <View style={Styles.libraryview_2}>
            <View style={Styles.library_contain2}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </View>
            <View style={Styles.library_contain4}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </View>
            <View style={Styles.library_contain4}>
              <Image
                source={require('../../Image/알약.png')}
                style={Styles.like_medicine_image}
              />
              <PillBox />
            </View>
          </View>
        </View>
      </View>

      <NavigationBar navigation={navigation} />
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  library_contain_view: {
    // 박스 뷰
    width: 328,
    height: 500,
    marginTop: 130,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  libraryview_1: {
    // 왼쪽 박스 뷰
    width: 185,
  },

  libraryview_2: {
    //오른쪽 박스 뷰
    width: 145,
  },

  libary_contain: {
    //약도서관 박스
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  library_contain2: {
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  library_contain3: {
    width: 143,
    height: 143,
    marginTop: 35,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  library_contain4: {
    width: 143,
    height: 143,
    marginTop: 35,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'grey',
  },

  like_medicine_image: {
    //찜한 약 사진
    width: 140,
    height: 140,
    position: 'absolute',
    borderRadius: 20,
  },

  heart_icon_touch_view: {
    //하트 아이콘 터치뷰
    marginLeft: 105,
    marginBottom: 90,
  },

  pilllibrary_font: {
    //약 도서관 글씨
    position: 'absolute',
    marginTop: 50,
    left: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PillLibrary;
