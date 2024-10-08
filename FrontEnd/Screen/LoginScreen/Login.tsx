import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { Google_PopUp, Apple_PopUp, Kakao_PopUp, Guest_PopUp } from "./Login_Success";

const Login = () => {
  return(
    <>
      <View style={Styles.container}>

        <View style={Styles.appicon}>
          <Image source={require('../../Image/AppLogo.png')} />
          <Image source={require('../../Image/AppName.png')} style={Styles.appname} />
        </View>

        <View style={Styles.button_view}>
         <TouchableOpacity style={Styles.googleButton} activeOpacity={0.7} onPress={Google_PopUp}>
          <Image source={require('../../Image/googlelogo.png')} style={Styles.login_logo}/>
          <Text style={Styles.black_text}>구글 계정으로 로그인</Text>
         </TouchableOpacity>

         <TouchableOpacity style={Styles.appleButton} activeOpacity={0.7} onPress={Apple_PopUp}>
          <Image source={require('../../Image/applelogo.png')} style={Styles.login_logo}/>
          <Text style={Styles.white_text}>애플 계정으로 로그인</Text>
         </TouchableOpacity>

         <TouchableOpacity style={Styles.kakaoButton} activeOpacity={0.7} onPress={Kakao_PopUp}>
          <Image source={require('../../Image/kakaologo.png')} style={Styles.login_logo}/>
          <Text style={Styles.black_text}>카카오 계정으로 로그인</Text>
         </TouchableOpacity>

         <TouchableOpacity style={Styles.guestButton} activeOpacity={0.7} onPress={Guest_PopUp}>
          <Image source={require('../../Image/guestlogo.png')} style={Styles.login_logo}/>
          <Text style={Styles.white_text}>게스트 계정으로 로그인</Text>
         </TouchableOpacity>
        </View>

      </View>
      
    </>
  )
}

const Styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
  },

  appname: {                          //약선생
    marginTop: 12,
  },

  appicon: {                         //앱로고
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 180
  },

  button_view: {                    //로그인 버튼 뷰
    marginTop: 70
  },

  googleButton: {                   //구글 로그인 버튼
    height : 47,
    width : 324,
    borderWidth: 1,
    borderRadius: 21,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }, 

  appleButton: {                        //애플 로그인 버튼
    marginTop: 25,
    height : 47,
    width : 324,
    borderRadius: 21,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
   
  kakaoButton: {                       //카카오 로그인 버튼
    marginTop: 25,
    height : 47,
    width : 324,
    borderRadius: 21,
    backgroundColor: '#FEE500',
    justifyContent: 'center',
    alignItems: 'center'
  },

  guestButton: {                        //게스트 로그인 버튼
    marginTop: 25,
    height : 47,
    width : 324,
    borderRadius: 21,
    backgroundColor: '#3AA8F8',
    justifyContent: 'center',
    alignItems: 'center'
  },

  black_text: {                               //로그인 검은 글씨 설정
    fontSize: 15,
    color: 'black',
    fontFamily: 'Jua',
  },

  white_text: {                               //로그인 하얀 글씨 설정
    fontSize: 15,
    color: 'white',
    fontFamily: 'Jua'
  },
  
  login_logo: {                               //로그인 버튼 각각의 로고
    position: 'absolute',
    right: '80%',
  },
})

export default Login;