//나의 정보 수정 페이지입니다.
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import CustomText from '../../Function/CustomText';

import {editSave, goAccount} from '../../Function/Navigation';

const ProfileEdit = ({navigation}) => {
  const [text, setText] = useState('');
  let email_value = '1234@gmail.com'; //서버 받아온 이메일 저장소

  return (
    <>
      <View style={Styles.topbar}>
        <TouchableOpacity onPress={() => goAccount(navigation)}>
          <Image
            source={require('../../Image/뒤로가기.png')}
            style={Styles.back}
          />
        </TouchableOpacity>

        <CustomText style={Styles.proflie_edit_text}>프로필 수정</CustomText>

        <TouchableOpacity onPress={() => editSave(navigation)}>
          <Image
            source={require('../../Image/확인_체크.png')}
            style={Styles.save}
          />
        </TouchableOpacity>
      </View>

      <View style={Styles.middlebar}>
        <View style={Styles.profile_image_view}>
          <Image
            source={require('../../Image/사람_프로필.png')}
            style={Styles.profile_image}
          />
        </View>

        <TouchableOpacity style={Styles.gallery_button}>
          <Image
            source={require('../../Image/갤러리불러오기.png')}
            style={Styles.gallery_image}
          />
        </TouchableOpacity>
      </View>

      <View style={Styles.bottombar}>
        <View style={Styles.user_info_view}>
          <View style={Styles.user_name}>
            <CustomText style={Styles.user_name_text}>사용자 이름</CustomText>
            <TextInput
              style={Styles.username_edit}
              onChangeText={newText => setText(newText)}
              placeholder="사용자 이름을 입력해주세요"
              placeholderTextColor={'#9CD3FB'}
              textAlignVertical="bottom"
            />
          </View>

          <View style={Styles.user_email}>
            <CustomText style={Styles.user_email_text}>계정 이메일</CustomText>
            <CustomText style={Styles.login_email_check}>
              {email_value}
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  topbar: {
    //맨 위쪽 뷰
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  back: {
    //뒤로가기 아이콘
    top: 20,
    marginRight: 70,
  },

  proflie_edit_text: {
    //프로필 수정 텍스트
    fontSize: 30,
    fontWeight: 'bold',
    top: 20,
    color: 'black',
  },

  save: {
    //저장 아이콘
    top: 20,
    marginLeft: 68,
  },

  middlebar: {
    //중간 뷰
    width: '100%',
    height: 227,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  profile_image_view: {
    //프로필 이미지 뷰
    width: 126,
    height: 126,
    borderRadius: 62,
    top: 20,
    borderWidth: 4,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile_image: {
    //프로필 이미지 사진
    width: 123,
    height: 123,
    borderRadius: 61,
  },

  gallery_button: {
    //갤러리 버튼
    width: 32,
    height: 32,
    borderRadius: 15,
    backgroundColor: '#3AA8F8',
    position: 'absolute',
    top: 158,
    right: 128,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gallery_image: {
    //갤러리 아이콘
    width: 18,
    height: 18,
  },

  bottombar: {
    //아래 뷰
    flex: 1,
    backgroundColor: 'white',
  },

  user_info_view: {
    //사용자 이름, 이메일 뷰
    marginLeft: 41,
    marginTop: 15,
  },

  user_name: {
    //사용자 이름 뷰
    width: 322,
    height: 114,
  },

  user_name_text: {
    //사용자 이름 텍스트
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },

  username_edit: {
    //사용자 이름 입력란
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    width: 305,
    borderBottomColor: '#837A7A',
    backgroundColor: 'white',
  },

  user_email: {
    //계정이메일 뷰
    width: 322,
    height: 114,
  },

  user_email_text: {
    //계정 이메일 텍스트
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },

  login_email_check: {
    //이메일 확인란
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    width: 305,
    height: 45,
    borderBottomColor: '#837A7A',
    backgroundColor: 'white',
    paddingTop: 13,
  },
});
export default ProfileEdit;
