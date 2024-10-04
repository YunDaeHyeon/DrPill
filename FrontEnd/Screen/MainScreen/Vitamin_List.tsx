//비타민 목록 화면입니다.
import { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, TextInput, Text } from "react-native";

const VitaminInfo = () => {
  const [text, setText] = useState('');

    return (
        <>
            <View style={Styles.container}>

              <View style={Styles.searchbox}>
                <Image source={require('../../Image/돋보기.png')} style={Styles.search_icon}/>
                <TextInput
                  style={Styles.search_text}
                  onChangeText={newText => setText(newText)}
                  placeholder="                비타민"
                  placeholderTextColor={'#C0E3FD'} />
              </View>
              
              <View>
                <Image source={require('../../Image/filter.png')} style={Styles.sort_filter}/>
              </View>

              <View style={Styles.vitamincontain_view}>

                  <View style={Styles.vitaminview_1}>
                    <TouchableOpacity activeOpacity={0.7} style={Styles.vitamin_contain}/>
                    <Text style={Styles.vitamincontain_text}>베아제</Text>

                    <TouchableOpacity activeOpacity={0.7} style={Styles.vitamin_contain3}/>
                    <Text style={Styles.vitamincontain_text}>베아제</Text>
                  </View>

                  <View style={Styles.vitaminview_2}>
                    <TouchableOpacity activeOpacity={0.7} style={Styles.vitamin_contain2}/>
                    <Text style={Styles.vitamincontain_text}>베아제</Text>
                      
                    <TouchableOpacity activeOpacity={0.7} style={Styles.vitamin_contain4}/>
                    <Text style={Styles.vitamincontain_text}>베아제</Text>
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

  searchbox: {                              //검색창 박스 
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

  navigation_bar: {                          //메뉴바
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

  home_icon: {                          // 메뉴바 홈 아이콘
    marginTop: 10,
    marginLeft: 40
  },

  camera_icon: {                      //  메뉴바 카메라 아이콘
    marginTop: 10,
    marginLeft: 53
  },

  library_icon: {                     //   메뉴바 도서관 아이콘
    marginTop: 10,
    marginLeft: 53
  },

  account_icon: {                   //메뉴바 계정 아이콘
    marginTop: 10,
    marginLeft: 53
  },

  search_icon: {                //검색 돋보기 아이콘
    position: 'absolute',
    marginLeft: 35
  },

  search_text: {                //검색창 글씨
    marginLeft: 70,
    fontSize: 18,
    color: 'black'
  },

  vitamincontain_view: {           //비타민 박스 뷰
    width: 330,
    height: 400,
    marginTop: 25,
    marginLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  vitaminview_1: {           //비타민 박스
    width: 180
  },

  vitaminview_2: {
    width: 145
  },


  vitamin_contain: {
    width: 143,
    height: 145,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center'
  },

  vitamin_contain2: {
    width: 143,
    height: 145,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center'
  },

  vitamin_contain3: {
    width: 145,
    height: 145,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center'
  },

  vitamin_contain4: {
    width: 145,
    height: 145,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center'
  },

  vitamincontain_text:{            //비타민 텍스트
    marginTop: 12,
    fontSize: 20,
    fontFamily: 'Jua',
    fontWeight: 'bold'
  },

  sort_filter: {              //필터 아이콘
    left: '38%',
    marginTop: 16
  }

})

export default VitaminInfo;