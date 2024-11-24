import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {MedicineListContext} from '../../Function/MainListContext';

import {NavigationBar} from '../Commonness/NavigationBar';
import {MedicineListBox} from '../../Function/ListLike';

import Config from 'react-native-config';
import axios from 'axios';

const MedicineList = ({navigation, medicineName}) => {
  console.log('전송 성공', medicineName);
  const medicineListContext = useContext(MedicineListContext);
  if (!medicineListContext) {
    throw new Error(
      'MedicineListContext must be used within a MedicineListProvider',
    );
  }

  const {text, setText, isListOpen, toggleListOpen} = medicineListContext;
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  //데이터 가져오기
  useEffect(() => {
    const fetchMedicineData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?` +
            `serviceKey=${Config.React_APP_API_KEY}&` +
            `numOfRows=30&` +
            `efcyQesitm=${medicineName}&` +
            `type=json`,
        );

        const data = response.data.body.items || [];
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineData();
  }, []);

  // 모달 열기
  const openModal = imageUri => {
    setSelectedImage(imageUri);
    toggleListOpen();
  };

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.searchbox}>
          <Image
            source={require('../../Image/searchicon.png')}
            style={Styles.search_icon}
          />
          <TextInput
            style={Styles.search_text}
            onChangeText={setText}
            value={text}
            placeholder={'약의 이름을 입력해주세요'}
            placeholderTextColor={'#C0E3FD'}
          />
        </View>

        <View>
          <Image
            source={require('../../Image/filter.png')}
            style={Styles.sort_filter}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#b4b4b4" />
        ) : (
          <ScrollView contentContainerStyle={Styles.medicineList}>
            {filteredData.map((item, index) => (
              <View key={index} style={Styles.medicineItem}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => openModal(item.itemImage)}>
                  <Image
                    source={{
                      uri: item.itemImage || 'https://via.placeholder.com/100',
                    }}
                    style={Styles.medicineImage}
                  />
                </TouchableOpacity>
                <Text style={Styles.medicineText}>{item.itemName}</Text>
              </View>
            ))}
          </ScrollView>
        )}

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
                {filteredData.map((item, index) => (
                  <View key={index} style={Styles.modalcontext}>
                    <Text style={Styles.library_modalText}>제품명</Text>
                    <Text>{item.itemName}</Text>

                    <Text style={Styles.library_modalText}>효능</Text>
                    <Text>{item.efcyQesitm}</Text>

                    <Text style={Styles.library_modalText}>사용법</Text>
                    <Text>{item.useMethodQesitm}</Text>

                    <Text style={Styles.library_modalText}>주의사항</Text>
                    <Text>{item.atpnQesitm}</Text>

                    <Text style={Styles.library_modalText}>부작용</Text>
                    <Text>{item.seQesitm}</Text>

                    <Text style={Styles.library_modalText}>보관법</Text>
                    <Text>{item.depositMethodQesitm}</Text>
                  </View>
                ))}
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
    height: '260%',
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
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
    //모달 이미지
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
    //모달 박스
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
    //약 이름 모달
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

  medicineList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  medicineItem: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    padding: 8,
  },

  medicineImage: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 8,
  },

  medicineText: {
    fontSize: 16,
    marginLeft: 7,
    marginTop: '9%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MedicineList;
