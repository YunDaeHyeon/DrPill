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
          <View style={Styles.modalMainContainer}>
            <View style={Styles.modalSubContainer}>
              <MedicineListBox />

              <View style={Styles.modalbox}>
                <Text style={Styles.modalTitle}>약 이름</Text>
                <View style={Styles.imagecontainer}>
                  <Image
                    source={selectedImage ? {uri: selectedImage} : undefined}
                  />
                </View>
              </View>

              <ScrollView style={Styles.modalThdContainer}>
                <View style={Styles.infoBox}>
                  <Text style={Styles.infoTitle}>효능</Text>
                  <Text>
                    {filteredData.map(item => item.efcyQesitm).join(', ')}
                  </Text>
                </View>

                <View style={Styles.infoBox}>
                  <Text style={Styles.infoTitle}>사용법</Text>
                  <Text>
                    {filteredData.map(item => item.useMethodQesitm).join(', ')}
                  </Text>
                </View>

                <View style={Styles.infoBox}>
                  <Text style={Styles.infoTitle}>주의사항</Text>
                  <Text>
                    {filteredData.map(item => item.atpnQesitm).join(', ')}
                  </Text>
                </View>

                <View style={Styles.infoBox}>
                  <Text style={Styles.infoTitle}>부작용</Text>
                  <Text>
                    {filteredData.map(item => item.seQesitm).join(', ')}
                  </Text>
                </View>

                <View style={Styles.infoBox}>
                  <Text style={Styles.infoTitle}>보관 방법</Text>
                  <Text>
                    {filteredData
                      .map(item => item.depositMethodQesitm)
                      .join(', ')}
                  </Text>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={Styles.modalCloseBtn}
                onPress={toggleListOpen}>
                <Text style={Styles.modalCloseBtnText}>닫기</Text>
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
  sort_filter: {
    //필터 아이콘
    left: '38%',
    marginTop: 16,
  },

  modalMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
  },
  modalSubContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalThdContainer: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  medicineImage: {
    width: 200, // 이미지 너비
    height: 100, // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'blue',
    borderWidth: 40,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 14,
    color: '#555',
  },
  modalCloseBtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3AA8F8',
    borderRadius: 30,
    marginLeft: '40%',
    width: 70,
  },

  modalCloseBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  imagecontainer: {
    width: '80%', // 이미지 너비
    height: '60%', // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'grey',
  },

  modalbox: {
    //모달 박스
    width: '100%',
    height: '25%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'gray',
    marginBottom: 15,
    marginTop: '3%',
    alignItems: 'center',
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
