//내 계정 화면입니다.
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationBar} from '../Commonness/NavigationBar';

const MyPage = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(
    '../../Image/사람_프로필.png',
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedNickname = await AsyncStorage.getItem('nickname');
        const storedProfileImage = await AsyncStorage.getItem('profileImage');

        if (storedNickname) setNickname(storedNickname);
        if (storedProfileImage) setProfileImage(storedProfileImage);
      } catch (error) {
        console.error('AsyncStorage에서 데이터 불러오기 실패:', error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.topbar}>
          <Text style={Styles.page_text}>계정</Text>
          <Image source={require('../../Image/종.png')} style={Styles.bell} />
          <View style={Styles.profile_view}>
            <View style={Styles.profile_image_view}>
              <Image
                source={
                  profileImage.startsWith('http')
                    ? {uri: profileImage}
                    : require('../../Image/사람_프로필.png')
                }
                style={Styles.profile_image}
              />
            </View>
            <Text style={Styles.user_name}>{nickname}</Text>
          </View>
        </View>

        <View style={Styles.middle_bar}>
          <Text style={Styles.setting_text}>설정</Text>
          <TouchableOpacity style={Styles.setting_touch}>
            <Image
              source={require('../../Image/pencil.png')}
              style={Styles.setting_button_icon}
            />
            <Text style={Styles.setting_button_text}>글씨 크기 조정</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.setting_touch}>
            <Image
              source={require('../../Image/mic.png')}
              style={Styles.setting_button_icon}
            />
            <Text style={Styles.setting_button_text}>오디오 기능</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.setting_touch}>
            <Image
              source={require('../../Image/light.png')}
              style={Styles.setting_button_icon}
            />
            <Text style={Styles.setting_button_text}> 밝기 조절</Text>
          </TouchableOpacity>
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

  topbar: {
    width: '100%',
    height: 280,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#EAEAEA',
    elevation: 10,
    shadowColor: 'lightgray',
  },

  middle_bar: {
    width: '100%',
    height: 421,
  },

  profile_view: {
    width: 90,
    marginLeft: 50,
    marginTop: 30,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  profile_image_view: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D9D9D9',
    marginTop: 10,
    elevation: 3,
  },

  user_name: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },

  profile_image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  page_text: {
    marginTop: 40,
    left: 30,
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },

  setting_text_view: {
    width: 48,
    height: 38,
    marginLeft: 47,
    marginTop: 64,
    backgroundColor: 'violet',
  },

  setting_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    left: 30,
    marginTop: 64,
    marginBottom: 15,
  },

  setting_button_text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    left: 15,
  },

  setting_button_icon: {
    marginTop: 5,
  },

  setting_touch: {
    flexDirection: 'row',
    paddingTop: 25,
    left: 40,
  },

  bell: {
    position: 'absolute',
    right: 30,
    marginTop: 52,
  },
});

export default MyPage;
