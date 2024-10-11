//내 계정 화면입니다.
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';

import {handleProfileEdit} from '../../Function/Navigation';

import {NavigationBar} from '../Commonness/NavigationBar';

const MyPage = ({navigation}) => {
  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.topbar}>
          <Text style={Styles.page_text}>계정</Text>
          <Image source={require('../../Image/종.png')} style={Styles.bell} />
          <View style={Styles.profile_view}>
            <View style={Styles.profile_image_view}>
              <Image
                source={require('../../Image/사람_프로필.png')}
                style={Styles.profile_image}
              />
            </View>
            <Text style={Styles.user_name}>봉가은</Text>
          </View>
          <View style={Styles.profile_update_view}>
            <TouchableOpacity onPress={() => handleProfileEdit(navigation)}>
              <Text style={Styles.profile_update_text}>프로필 수정</Text>
            </TouchableOpacity>
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

  profile_update_view: {
    position: 'absolute',
    width: 100,
    height: 38,
    marginTop: 240,
    marginLeft: 295,
    backgroundColor: 'white',
  },

  profile_update_text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
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
