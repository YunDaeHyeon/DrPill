import React, {useContext} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import {MedicineListContext} from '../../Function/MainListContext';

import {NavigationBar} from '../Commonness/NavigationBar';
import {MedicineListBox} from '../../Function/ListLike';

import ImagePath from '../../Image/Based64Image/ImagePath';

const MedicineList = ({navigation, medicineName}) => {
  const medicineListContext = useContext(MedicineListContext);
  if (!medicineListContext) {
    throw new Error(
      'MedicineListContext must be used within a MedicineListProvider',
    );
  }

  const {text, setText, isListOpen, toggleListOpen, selectedImage} =
    medicineListContext;

  var i = 0;

  // 약 이미지 동적 변환
  switch (medicineName) {
    case '해열·진통 소염제':
      break;
    case '발한제 지한제':
      i = 1;
      break;
    case '안과용제':
      i = 2;
      break;
    case '구강용약':
      i = 3;
      break;
    case '구충제':
      i = 4;
      break;
    case '알레르기':
      i = 5;
      break;
    case '이비과용제':
      i = 6;
      break;
    case '제산제':
      i = 7;
      break;
  }

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
            onChangeText={setText}
            value={text}
            placeholder={`${medicineName}`}
            placeholderTextColor={'#C0E3FD'}
          />
        </View>

        <View>
          <Image
            source={require('../../Image/filter.png')}
            style={Styles.sort_filter}
          />
        </View>

        <ScrollView>
          <View style={Styles.allergycontain_view}>
            <View style={Styles.allergyview_1}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i])}>
                <Image
                  source={{uri: ImagePath[i]}}
                  style={Styles.allergy_contain2}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 1])}>
                <Image
                  source={{uri: ImagePath[i + 1]}}
                  style={Styles.allergy_contain3}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 2])}>
                <Image
                  source={{uri: ImagePath[i + 2]}}
                  style={Styles.allergy_contain3}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 3])}>
                <Image
                  source={{uri: ImagePath[i + 3]}}
                  style={Styles.allergy_contain3}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>
            </View>

            <View style={Styles.allergyview_2}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 4])}>
                <Image
                  source={{uri: ImagePath[i + 4]}}
                  style={Styles.allergy_contain2}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 5])}>
                <Image
                  source={{uri: ImagePath[i + 5]}}
                  style={Styles.allergy_contain3}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 6])}>
                <Image
                  source={{uri: ImagePath[i + 6]}}
                  style={Styles.allergy_contain3}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 7])}>
                <Image
                  source={{uri: ImagePath[i + 7]}}
                  style={Styles.allergy_contain3}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain3}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>
            </View>

            <View style={Styles.allergyview_3}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 8])}>
                <Image
                  source={{uri: ImagePath[i + 8]}}
                  style={Styles.allergy_contain}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 9])}>
                <Image
                  source={{uri: ImagePath[i + 9]}}
                  style={Styles.allergy_contain4}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 10])}>
                <Image
                  source={{uri: ImagePath[i + 10]}}
                  style={Styles.allergy_contain4}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleListOpen(ImagePath[i + 11])}>
                <Image
                  source={{uri: ImagePath[i + 11]}}
                  style={Styles.allergy_contain4}
                />
              </TouchableOpacity>
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain4}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain4}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain4}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.allergy_contain4}
              />
              <Text style={Styles.allergycontain_text}>베아제</Text>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={isListOpen}
          transparent={true}
          onRequestClose={toggleListOpen}>
          <View style={Styles.modalOverlay}>
            <View style={Styles.modalContent}>
              <ScrollView style={Styles.modalcontain}>
                <View style={Styles.modalbox}>
                  <Text
                    style={{
                      marginTop: 15,
                      marginLeft: 10,
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    약 고유번호
                  </Text>
                  <MedicineListBox />
                  <View style={Styles.modal_image}>
                    <Image
                      source={{
                        uri: `${selectedImage}` || undefined,
                      }}
                      style={{
                        objectFit: 'cover',
                        width: 300,
                        height: 160,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={Styles.modalcontext}>
                  <Text style={Styles.library_modalText}>제품명</Text>

                  <Image
                    source={require('../../Image/타이레놀_제품명.png')}
                    style={Styles.librarymodal_image}
                  />
                  <Text style={Styles.library_modalText}>효능</Text>
                  <View style={Styles.effectmodal}>
                    <Image
                      source={require('../../Image/타이레놀_효능.png')}
                      style={Styles.librarymodal_image}
                    />
                  </View>
                  <Text style={Styles.library_modalText}>사용법</Text>
                  <Image
                    source={require('../../Image/타이레놀_사용법.png')}
                    style={Styles.librarymodal_image}
                  />
                  <Text style={Styles.library_modalText}>주의사항</Text>
                  <Image
                    source={require('../../Image/타이레놀_주의사항.png')}
                    style={Styles.librarymodal_image}
                  />
                  <Text style={Styles.library_modalText}>부작용</Text>
                  <Image
                    source={require('../../Image/타이레놀_부작용.png')}
                    style={Styles.librarymodal_image}
                  />
                  <Text style={Styles.library_modalText}>보관법</Text>
                  <Image
                    source={require('../../Image/타이레놀_보관법.png')}
                    style={Styles.librarymodal_image}
                  />
                </View>
              </ScrollView>

              <TouchableOpacity
                onPress={toggleListOpen}
                style={Styles.closeButton}>
                <Text style={Styles.closeText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

  allergycontain_view: {
    //알레르기 박스 뷰
    width: '100%',
    height: '100%',
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  allergyview_1: {
    //알레르기 왼쪽 뷰
    width: '33.33%',
    backgroundColor: 'white',
  },

  allergyview_2: {
    //알레르기 가운데 뷰
    width: '33.33%',
    backgroundColor: 'white',
  },

  allergyview_3: {
    //알레르기 오른쪽 뷰
    width: '33.33%',
    backgroundColor: 'white',
  },

  allergy_contain: {
    //알레르기 박스
    width: '98%',
    height: 106,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    marginLeft: '1%',
  },

  allergy_contain2: {
    width: '99%',
    height: 106,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    marginLeft: '1%',
    objectFit: 'cover',
  },

  allergy_contain3: {
    width: '99%',
    height: 106,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    marginLeft: '1%',
  },

  allergy_contain4: {
    width: '98%',
    height: 106,
    marginTop: 15,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    marginLeft: '1%',
  },

  allergycontain_text: {
    //알레르기 텍스트
    marginTop: 3,
    fontSize: 18,
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },

  sort_filter: {
    //필터 아이콘
    left: '38%',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContent: {
    //모달 크기
    width: '90%',
    height: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalcontain: {
    position: 'absolute',
    width: '105%',
    height: '93%',
    marginTop: 15,
    backgroundColor: 'white',
  },
  modal_image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 160,
    marginLeft: 9,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'grey',
  },

  closeButton: {
    //닫는 버튼
    position: 'absolute',
    marginTop: '210%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3f88bf',
    borderRadius: 5,
  },
  closeText: {
    //닫는 버튼 텍스트
    color: 'white',
    fontWeight: 'bold',
  },
  modalbox: {
    width: 320,
    height: 235,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'gray',
  },

  modalcontext: {
    width: 320,
    marginTop: 10,
    height: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  librarymodal_image: {
    //사진
    marginLeft: 10,
    width: '95%',
    objectFit: 'fill',
  },

  library_modalText: {
    //모달 텍스트
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
  },

  effectmodal: {
    width: 320,
    height: 150,
    backgroundColor: 'white',
  },
});

export default MedicineList;
