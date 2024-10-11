//앱 로드 화면입니다.
import {StyleSheet, Image, View} from 'react-native';

const AppLoad = () => {
  return (
    <>
      <View style={Styles.container}>
        <Image source={require('../Image/AppLogo.png')} />
      </View>

      <View style={Styles.appname_view}>
        <Image source={require('../Image/AppName.png')} />
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appname_view: {
    height: 86,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AppLoad;
