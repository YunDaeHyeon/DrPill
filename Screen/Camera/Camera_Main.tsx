//카메라 화면입니다.
import { StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";

const CameraMain = () => {
  return (
      <>
         <View style={Styles.container}>
          <View style={Styles.top_bar}>

          </View>
            <View style={Styles.camera_area}>
              <Image source={require('../../Image/back.png')} style={Styles.back_icon}></Image>
              <Image source={require('../../Image/gallery.png')} style={Styles.gallery_icon}></Image>
              <Text style={Styles.camera_text}>물체를 가까이에서 선명하게 촬영해주세요</Text>
            </View>
          </View>

          <View style={Styles.camera_navigation_bar}>
           <TouchableOpacity activeOpacity={0.7}>
              <Image source={require('../../Image/shutter.png')}/>
            </TouchableOpacity>
          </View>
      </>
    )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },

  camera_area: {                      //카메라 영역
    backgroundColor: '#F3F3F3',
    width: 414,
    height: 643
  },

  top_bar: {                              
    backgroundColor: 'white',
    height: 106,
    width: '100%'
  },

  camera_navigation_bar: {                   //카메라 메뉴바
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    verticalAlign: 'bottom',
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth : 1,
    height: 147,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  gallery_icon: {                 //갤러리 아이콘
    left: '80%',
    marginTop: 24
  },

  back_icon: {                          //뒤로가기 아이콘
    left: 40,
    position: 'absolute',
    marginTop: 24
  },

  camera_text: {                      //카메라 안 글씨
    top: '30%',
    left: '19%',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Jua'
  }

})

export default CameraMain;