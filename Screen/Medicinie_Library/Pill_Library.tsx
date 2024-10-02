//약 도서관 화면입니다.
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';

const PillLibrary = () => {
  const [text, setText] = useState('');
  return (
    <>
      <View style={Styles.container}>
        <Text style={Styles.pilllibrary_font}>약 도서관</Text>

        <View style={Styles.library_contain_view}>
          <View style={Styles.libraryview_1}>
            <View style={Styles.libary_contain} />
            <View style={Styles.library_contain3} />
            <View style={Styles.library_contain3} />
          </View>

          <View style={Styles.libraryview_2}>
            <View style={Styles.library_contain2} />
            <View style={Styles.library_contain4} />
            <View style={Styles.library_contain4} />
          </View>
        </View>
      </View>

      <View style={Styles.navigation_bar}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require('../../Image/메뉴바_홈.png')}
            style={Styles.home_icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../Image/메뉴바_카메라.png')}
            style={Styles.camera_icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../Image/메뉴바_도서관.png')}
            style={Styles.library_icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../Image/메뉴바_계정.png')}
            style={Styles.account_icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

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
    // 메뉴바 홈 아이콘
    marginTop: 10,
    marginLeft: 40,
  },

  camera_icon: {
    //  메뉴바 카메라 아이콘
    marginTop: 10,
    marginLeft: 53,
  },

  library_icon: {
    //   메뉴바 도서관 아이콘
    marginTop: 10,
    marginLeft: 53,
  },

  account_icon: {
    //메뉴바 계정 아이콘
    marginTop: 10,
    marginLeft: 53,
  },

  library_contain_view: {
    // 박스 뷰
    width: 331,
    height: 509,
    marginTop: 105,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  libraryview_1: {
    // 왼쪽 박스 뷰
    width: 188,
  },

  libraryview_2: {
    //오른쪽 박스 뷰
    width: 145,
  },

  libary_contain: {
    //약도서관 박스
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
  },

  library_contain2: {
    width: 143,
    height: 143,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 20,
  },

  library_contain3: {
    width: 143,
    height: 143,
    marginTop: 40,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },

  library_contain4: {
    width: 143,
    height: 143,
    marginTop: 40,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },

  pilllibrary_font: {
    //약 도서관 글씨
    position: 'absolute',
    marginTop: 25,
    left: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default PillLibrary;
