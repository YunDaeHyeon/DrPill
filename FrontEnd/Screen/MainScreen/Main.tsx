/* eslint-disable react/react-in-jsx-scope */
//메인 화면입니다.
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {handleMedicineInfo} from '../../Function/Navigation.tsx';
import {NavigationBar} from '../Commonness/NavigationBar';

const Main = ({navigation}) => {
  const [text, setText] = useState(''); //text지우면 안됨
  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.searchbox}>
          <TouchableOpacity>
            <Image
              source={require('../../Image/searchicon.png')}
              style={Styles.search_icon}
            />
          </TouchableOpacity>
          <TextInput
            style={Styles.search_text}
            onChangeText={newText => setText(newText)}
            placeholder="약의 이름을 입력해주세요"
            placeholderTextColor={'#C0E3FD'}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            marginTop: 133,
            left: 29,
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Jua', fontWeight: 'bold'}}>
            약품종류
          </Text>
        </View>

        <View style={Styles.menubutton_view}>
          <View style={Styles.menubutton_1}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 152,
                height: 88,
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderRadius: 10,
                elevation: 5,
                shadowColor: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
              }}
              onPress={() =>
                handleMedicineInfo(navigation, '해열·진통 소염제')
              }>
              <Image
                source={require('../../Image/headicon.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '18%', fontSize: 20, fontWeight: 'bold'}}>
                해열·진통{'\n'}소염제
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '발한제 지한제')}>
              <Image
                source={require('../../Image/sweaticon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>발한제 지한제</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '안과용제')}>
              <Image
                source={require('../../Image/eye.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '20%', fontSize: 20, fontWeight: 'bold'}}>
                안과용제
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style}
              onPress={() => handleMedicineInfo(navigation, '구강용약')}>
              <Image
                source={require('../../Image/tooth.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '20%', fontSize: 20, fontWeight: 'bold'}}>
                구강용약
              </Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.menubutton_2}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 152,
                height: 88,
                marginLeft: 6,
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderRadius: 10,
                elevation: 5,
                shadowColor: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
              }}
              onPress={() => handleMedicineInfo(navigation, '구충제')}>
              <Image
                source={require('../../Image/wormicon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>구충제</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style2}
              onPress={() => handleMedicineInfo(navigation, '알레르기')}>
              <Image
                source={require('../../Image/allergyicon.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '18%', fontSize: 20, fontWeight: 'bold'}}>
                알레르기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style2}
              onPress={() => handleMedicineInfo(navigation, '이비과용제')}>
              <Image
                source={require('../../Image/noseicon.png')}
                style={Styles.menu_icon}
              />
              <Text
                style={{marginLeft: '10%', fontSize: 20, fontWeight: 'bold'}}>
                이비과용제
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.menubutton_style2}
              onPress={() => handleMedicineInfo(navigation, '제산제')}>
              <Image
                source={require('../../Image/pillicon.png')}
                style={Styles.menu_icon}
              />
              <Text style={Styles.menu_text}>제산제</Text>
            </TouchableOpacity>
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

  searchbox: {
    //검색창 박스
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 30,
    width: 317,
    height: 57,
    backgroundColor: 'white',
    marginTop: 35,
    elevation: 10,
    shadowColor: 'grey',
    justifyContent: 'center',
  },

  search_icon: {
    //검색 돋보기 아이콘
    position: 'absolute',
    marginLeft: 272,
    marginTop: 13,
  },

  search_text: {
    //검색창 글씨
    marginLeft: 25,
    width: 240,
    fontSize: 18,
    color: 'black',
  },

  menubutton_view: {
    //메뉴상자 뷰
    width: 321,
    height: 414,
    marginTop: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  menubutton_1: {
    //메뉴상자 왼쪽
    width: 163,
  },

  menubutton_2: {
    //메뉴상자 오른쪽
    width: 163,
  },

  menubutton_style: {
    //메뉴상자 왼쪽 박스
    width: 152,
    height: 88,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  menubutton_style2: {
    //메뉴상자 오른쪽 박스
    width: 152,
    height: 88,
    marginTop: 20,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  menu_icon: {
    //메뉴상자 아이콘
    position: 'absolute',
    marginLeft: '70%',
  },

  menu_text: {
    //메뉴상자 텍스트
    marginLeft: '25%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Main;
