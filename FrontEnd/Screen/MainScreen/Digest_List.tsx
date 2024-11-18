//소화제 목록 화면입니다.
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

const DigestInfo = ({navigation}) => {
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
            placeholder="                소화제"
            placeholderTextColor={'#C0E3FD'}
          />
        </View>

        <View>
          <Image
            source={require('../../Image/filter.png')}
            style={Styles.sort_filter}
          />
        </View>

        <View style={Styles.digestcontain_view}>
          <View style={Styles.digestview_1}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.digest_contain}
            />
            <Text style={Styles.digestcontain_text}>베아제</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.digest_contain3}
            />
            <Text style={Styles.digestcontain_text}>베아제</Text>
          </View>

          <View style={Styles.digestview_2}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.digest_contain2}
            />
            <Text style={Styles.digestcontain_text}>베아제</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.digest_contain4}
            />
            <Text style={Styles.digestcontain_text}>베아제</Text>
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

  digestcontain_view: {
    //소화제 박스 뷰
    width: 330,
    height: 400,
    marginTop: 25,
    marginLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  digestview_1: {
    //소화제 박스
    width: 180,
  },

  digestview_2: {
    width: 145,
  },

  digest_contain: {
    width: 143,
    height: 145,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  digest_contain2: {
    width: 143,
    height: 145,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  digest_contain3: {
    width: 145,
    height: 145,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  digest_contain4: {
    width: 145,
    height: 145,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
  },

  digestcontain_text: {
    //소화제 텍스트
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

export default DigestInfo;
