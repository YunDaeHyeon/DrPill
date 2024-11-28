//내 계정 화면입니다.
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationBar} from '../Commonness/NavigationBar';
import {initializeTtsListeners, playTTS} from '../../initializeTtsListeners';
import {handleLogoutDeleteScreen} from '../../Function/Navigation';
import AudioTts from './audiotts';
import CustomText from '../../Function/CustomText';

const MyPage = ({navigation}) => {
  const [nickname, setNickname] = useState('GUEST');
  const [profileImage, setProfileImage] = useState(
    '../../Image/사람_프로필.png',
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserProfile = await AsyncStorage.getItem('userProfile');

        if (storedUserProfile) {
          const {nickname, profileImage} = JSON.parse(storedUserProfile); // JSON 파싱
          setNickname(nickname || '닉네임 없음');
          setProfileImage(profileImage || '../../Image/사람_프로필.png');
        } else {
          console.log('사용자 정보 없음');
        }
      } catch (error) {
        console.error('AsyncStorage에서 데이터 불러오기 실패:', error);
      }
    };

    loadData();
    initializeTtsListeners(); // TTS 초기화 (한 번만 실행)
  }, []);

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.topbar}>
          <CustomText style={Styles.page_text}>계정</CustomText>
          <TouchableOpacity
            onPress={() => handleLogoutDeleteScreen(navigation)}>
            <Image
              source={require('../../Image/settings.png')}
              style={Styles.settings}
            />
          </TouchableOpacity>

          <View style={Styles.profile_view}>
            <View style={Styles.profile_image_view}>
              <Image
                source={
                  profileImage.startsWith('http')
                    ? {uri: profileImage}
                    : require('../../Image/profile.png')
                }
                style={Styles.profile_image}
              />
            </View>
            <Text style={Styles.user_name}>{nickname}</Text>
          </View>
        </View>

        <View style={Styles.middle_bar}>
          <CustomText style={Styles.setting_text}>맞춤 설정</CustomText>

          <TouchableOpacity
            style={Styles.setting_touch}
            onPress={() => navigation.navigate('AudioTts')}>
            <Image
              source={require('../../Image/mic.png')}
              style={Styles.setting_button_icon}
            />
            <CustomText style={Styles.setting_button_text}>
              {' '}
              오디오 기능
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.setting_touch}
            onPress={() => navigation.navigate('Disease_Data')}>
            <Image
              source={require('../../Image/cart.png')}
              style={Styles.setting_button_icon}
            />
            <CustomText style={Styles.setting_button_text}>
              사용자 관심 질환
            </CustomText>
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
    marginLeft: 30,
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
    fontSize: 20,
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
  },

  setting_text: {
    fontSize: 30,

    color: 'black',
    left: 30,
    marginTop: 64,
    marginBottom: 15,
  },

  setting_button_text: {
    fontSize: 22,
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

  settings: {
    position: 'absolute',
    right: 35,
    marginTop: -33,
    width: 35,
    height: 35,
  },
});

export default MyPage;
