//찾은 약 정보 화면입니다.
import {useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';

import {NavigationBar} from '../Commonness/NavigationBar';

const FindMedicine = ({navigation}) => {
  const [isHeartFull, setIsHeartFull] = useState(false);

  const changeHeart = () => {
    setIsHeartFull(!isHeartFull); // 상태를 변경하여 이미지 전환
  };

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.shot_image_view}>
          <Image
            source={require('../../Image/감기약_손사진.png')}
            style={Styles.find_picture}
          />
          <Image
            source={require('../../Image/새로고침.png')}
            style={Styles.reload}
          />
        </View>

        <View style={Styles.find_image_view}>
          <Text style={Styles.find_text}>사진의 이미지와 90% 유사해요</Text>

          <View style={Styles.find_image_info_view}>
            <Image
              source={require('../../Image/찾은약국약국.png')}
              style={Styles.find_image_edit}
            />
            <Image
              source={require('../../Image/찾은약국약국표.png')}
              style={Styles.find_image_info_edit}
            />
            <TouchableOpacity style={Styles.heart_view} onPress={changeHeart}>
              <Image
                source={
                  isHeartFull
                    ? require('../../Image/heart_full.png')
                    : require('../../Image/heart_empty.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.similar_image_view}>
          <View style={Styles.similar_text_block}>
            <Text style={{color: '#3AA8F8', fontWeight: 'bold'}}>
              유사한 약물
            </Text>
          </View>

          <View style={Styles.similar_medicine_view}>
            <View style={Styles.medicine_image_view1}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <View style={Styles.medicine_image_box1}>
                  <Image
                    source={require('../../Image/탁센.png')}
                    style={Styles.medicine_image}
                  />
                </View>
                <Text style={Styles.medicine_image_view_text}>타이레놀</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.medicine_image_view2}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <View style={Styles.medicine_image_box2}>
                  <Image
                    source={require('../../Image/탁센.png')}
                    style={Styles.medicine_image}
                  />
                </View>
                <Text style={Styles.medicine_image_view_text}>판콜</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.medicine_image_view3}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <View style={Styles.medicine_image_box3}>
                  <Image
                    source={require('../../Image/탁센.png')}
                    style={Styles.medicine_image}
                  />
                </View>
                <Text style={Styles.medicine_image_view_text}>약약</Text>
              </TouchableOpacity>
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

  shot_image_view: {
    //찍은 이미지 뷰
    width: '100%',
    height: 186,
    backgroundColor: '#F3F3F3',
  },

  find_picture: {
    //찍은 사진
    width: '100%',
    height: 186,
  },

  find_image_view: {
    //찾은 이미지 뷰
    width: '100%',
    height: 370,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },

  heart_view: {
    //하트 뷰
    marginTop: 13,
    left: '87%',
    // backgroundColor: 'black',
    position: 'absolute',
  },

  find_image_info_view: {
    //찾은 이미지 정보 뷰
    width: 337,
    height: 300,
    borderRadius: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'gray',
    marginTop: 12,
  },

  find_image_edit: {
    //찾은 이미지
    width: 300,
    height: 83,
    borderRadius: 20,
    marginTop: 40,
  },

  find_image_info_edit: {
    //찾은 이미지 정보
    width: 334,
    height: 128,
    marginTop: 10,
  },

  similar_image_view: {
    //유사한 이미지 뷰
    width: '100%',
    height: 162,
    alignItems: 'center',
  },

  similar_text_block: {
    //유사한 이미지 텍스트 블록
    width: 142,
    height: 29,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: '#EAEAEA',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'gray',
  },

  similar_medicine_view: {
    //유사한 약 뷰
    width: 380,
    height: 99,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },

  reload: {
    //새로고침 아이콘
    left: '85%',
    top: 20,
    position: 'absolute',
  },

  like: {
    //찜하기 아이콘
    left: '85%',
    top: 10,
    position: 'absolute',
  },

  find_text: {
    //찾은 이미지 유사도 텍스트
    fontSize: 18,
    color: '#3AA8F8',
    fontWeight: 'bold',
    marginTop: 12,
  },

  medicine_image: {
    //유사한 약 이미지
    width: 45,
    height: 45,
  },

  medicine_image_view1: {
    //유사한 약 이미지 뷰
    alignItems: 'center',
    right: '15%',
  },

  medicine_image_view2: {
    //유사한 약 이미지 뷰
    alignItems: 'center',
  },

  medicine_image_view3: {
    //유사한 약 이미지 뷰
    alignItems: 'center',
    left: '15%',
  },

  medicine_image_box1: {
    //유사한 약 이미지  박스
    borderWidth: 1,
    width: 57,
    height: 57,
    borderRadius: 10,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  medicine_image_box2: {
    //유사한 약 이미지  박스2
    borderWidth: 1,
    width: 57,
    height: 57,
    borderRadius: 10,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  medicine_image_box3: {
    //유사한 약 이미지  박스3
    borderWidth: 1,
    width: 57,
    height: 57,
    borderRadius: 10,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  medicine_image_view_text: {
    //유사한 약 이름
    fontWeight: 'bold',
    color: 'black',
  },
});

export default FindMedicine;
