import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import {
  goAccount,
  goCamera,
  goLibrary,
  goMain,
} from '../../Function/Navigation.tsx';

export const NavigationBar = ({navigation}) => {
  return (
    <View style={Styles.navigation_bar}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => goMain(navigation)}>
        <Image
          source={require('../../Image/menu_home.png')}
          style={Styles.home_icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goCamera(navigation)}>
        <Image
          source={require('../../Image/menu_camera.png')}
          style={Styles.camera_icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goLibrary(navigation)}>
        <Image
          source={require('../../Image/menu_library.png')}
          style={Styles.library_icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goAccount(navigation)}>
        <Image
          source={require('../../Image/menu_account.png')}
          style={Styles.account_icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  navigation_bar: {
    //메뉴바
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    verticalAlign: 'bottom',
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    height: 95,
    width: '100%',
    alignItems: 'center',
  },

  home_icon: {
    //메뉴바 홈 아이콘
    marginTop: 10,
    marginLeft: 40,
  },

  camera_icon: {
    //메뉴바 카메라 아이콘
    marginTop: 10,
    marginLeft: 53,
  },

  library_icon: {
    //메뉴바 도서관 아이콘
    marginTop: 10,
    marginLeft: 53,
  },

  account_icon: {
    //메뉴바 계정 아이콘
    marginTop: 10,
    marginLeft: 53,
  },
});
