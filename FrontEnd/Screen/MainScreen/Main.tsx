//메인 화면입니다.
import { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, TextInput, Text } from "react-native";

const Main = () => {
  const [text, setText] = useState('');

    return (
        <>
            <View style={Styles.container}>

              <View style={Styles.searchbox}>
                <Image source={require('../../Image/돋보기.png')} style={Styles.search_icon}/>
                <TextInput
                  style={Styles.search_text}
                  onChangeText={newText => setText(newText)}
                  placeholder="약의 이름을 입력해주세요"
                  placeholderTextColor={'#C0E3FD'} />
              </View>
              
              
              <View style={
                {
                  position: 'absolute',
                  marginTop: 141,
                  left: 29,
                  }
                }>
                <Text style={{fontSize: 20, fontFamily: 'Jua', fontWeight: 'bold'}}>약품종류</Text>
              </View>

              <View style={Styles.menubutton_view}>

                  <View style={Styles.menubutton_1}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={
                        {
                          width: 152,
                          height: 88,
                          borderWidth: 1,
                          borderColor: '#D9D9D9',
                          borderRadius: 10,
                          elevation: 15,
                          shadowColor: 'grey',
                          backgroundColor: 'white',
                          justifyContent: 'center'
                        }
                      }>
                      <Image source={require('../../Image/소화제_아이콘.png')} style={Styles.menu_icon}/>
                      <Text style={Styles.menu_text}>소화제</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={Styles.menubutton_style}>
                      <Image source={require('../../Image/감기약_아이콘.png')} style={Styles.menu_icon}/>
                      <Text style={Styles.menu_text}>감기약</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={Styles.menubutton_style}>
                     <Image source={require('../../Image/비타민_아이콘.png')} style={Styles.menu_icon}/>
                     <Text style={Styles.menu_text}>비타민</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={Styles.menubutton_2}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={
                        {
                          width: 152,
                          height: 88,
                          marginLeft: 6,
                          borderWidth: 1,
                          borderColor: '#D9D9D9',
                          borderRadius: 10,
                          elevation: 15,
                          shadowColor: 'grey',
                          backgroundColor: 'white',
                          justifyContent: 'center'
                        }
                      } >
                      <Image source={require('../../Image/진통제_아이콘.png')} style={Styles.menu_icon}/>
                      <Text style={Styles.menu_text}>진통제</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={Styles.menubutton_style2}>
                      <Image source={require('../../Image/알레르기_아이콘.png')} style={Styles.menu_icon}/>
                      <Text style={{marginLeft:'18%', fontSize:20, fontWeight: 'bold'}}>알레르기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={Styles.menubutton_style2}>
                      <Image source={require('../../Image/소염제_아이콘.png')} style={Styles.menu_icon}/>
                      <Text style={Styles.menu_text}>소염제</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>


            <View style={Styles.navigation_bar}>
             <TouchableOpacity activeOpacity={0.7}>
                <Image source={require('../../Image/메뉴바_홈.png')} style={Styles.home_icon}/>
              </TouchableOpacity>

              <TouchableOpacity>
              <Image source={require('../../Image/메뉴바_카메라.png')} style={Styles.camera_icon}/>
              </TouchableOpacity>

              <TouchableOpacity>
              <Image source={require('../../Image/메뉴바_도서관.png')} style={Styles.library_icon}/>
              </TouchableOpacity>

              <TouchableOpacity>
              <Image source={require('../../Image/메뉴바_계정.png')} style={Styles.account_icon}/>
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

  searchbox: {                                //검색창 박스
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 30,
    width : 317,
    height : 57,
    backgroundColor: 'white',
    marginTop: 50,
    elevation: 10,
    shadowColor: 'grey',
    justifyContent : 'center'
  },

  navigation_bar: {                         //메뉴바
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    verticalAlign: 'bottom',
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth : 1,
    height: 95,
    width: '100%',
    alignItems: 'center'
  },

  home_icon: {                            //메뉴바 홈 아이콘
    marginTop: 10,
    marginLeft: 40
  },

  camera_icon: {                        //메뉴바 카메라 아이콘
    marginTop: 10,
    marginLeft: 53
  },

  library_icon: {                      //메뉴바 도서관 아이콘
    marginTop: 10,
    marginLeft: 53
  },

  account_icon: {                     //메뉴바 계정 아이콘
    marginTop: 10,
    marginLeft: 53
  },

  search_icon: {                      //검색 돋보기 아이콘
    position: 'absolute',
    marginLeft: 35
  },

  search_text: {                     //검색창 글씨
    marginLeft: 70,
    fontSize: 18,
    color: 'black'
  },

  menubutton_view: {              //메뉴상자 뷰
    width: 321,
    height: 306,
    marginTop: 80,
    flexDirection: 'row'
  },

  menubutton_1: {               //메뉴상자 왼쪽
    width: 163
  },

  menubutton_2: {             //메뉴상자 오른쪽
    width: 163
  },

  menubutton_style: {           //메뉴상자 왼쪽 박스 
    width: 152,
    height: 88,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 15,
    shadowColor: 'grey',
    backgroundColor: 'white',
    justifyContent: 'center'
  },

  menubutton_style2: {            //메뉴상자 오른쪽 박스    
    width: 152,
    height: 88,
    marginTop: 20,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 15,
    shadowColor: 'grey',
    backgroundColor: 'white', 
    justifyContent: 'center'
  },

  menu_icon: {                   //메뉴상자 아이콘
    position: 'absolute',
    marginLeft: '70%'
  },

  menu_text: {                    //메뉴상자 텍스트
    marginLeft:'25%',
    fontSize:20,
    fontWeight: 'bold'
  }
})

export default Main;