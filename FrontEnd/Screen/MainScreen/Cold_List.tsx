//감기약 목록 화면입니다.
import {useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';

import {NavigationBar} from '../Commonness/NavigationBar';

const ColdInfo = ({navigation}) => {
  const [text, setText] = useState('');

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.searchbox}>
          <Image
            source={require('../../Image/돋보기.png')}
            style={Styles.search_icon}
          />
          <TextInput
            style={Styles.search_text}
            onChangeText={newText => setText(newText)}
            placeholder="                감기약"
            placeholderTextColor={'#C0E3FD'}
          />
        </View>

        <View>
          <Image
            source={require('../../Image/filter.png')}
            style={Styles.sort_filter}
          />
        </View>

        <View style={Styles.coldcontain_view}>
          <View style={Styles.coldview_1}>
            <TouchableOpacity activeOpacity={0.7} style={Styles.cold_contain} />
            <Text style={Styles.coldcontain_text}>베아제</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.cold_contain3}
            />
            <Text style={Styles.coldcontain_text}>베아제</Text>
          </View>

          <View style={Styles.coldview_2}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.cold_contain2}
            />
            <Text style={Styles.coldcontain_text}>베아제</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.cold_contain4}
            />
            <Text style={Styles.coldcontain_text}>베아제</Text>
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
    marginTop: 50,
    elevation: 10,
    shadowColor: 'grey',
    justifyContent: 'center',
  },

  search_icon: {
    //검색 돋보기 아이콘
    position: 'absolute',
    marginLeft: 35,
  },

  search_text: {
    //검색창 글씨
    marginLeft: 70,
    fontSize: 18,
    color: 'black',
  },

  coldcontain_view: {
    //감기약 박스 뷰
    width: 330,
    height: 400,
    marginTop: 25,
    marginLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  coldview_1: {
    //감기약 박스
    width: 180,
  },

  coldview_2: {
    width: 145,
  },

  cold_contain: {
    width: 143,
    height: 145,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  cold_contain2: {
    width: 143,
    height: 145,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  cold_contain3: {
    width: 145,
    height: 145,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  cold_contain4: {
    width: 145,
    height: 145,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  coldcontain_text: {
    //감기약 텍스트
    marginTop: 12,
    fontSize: 20,
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },

  sort_filter: {
    //필터 아이콘
    left: '38%',
    marginTop: 16,
  },
});

export default ColdInfo;
