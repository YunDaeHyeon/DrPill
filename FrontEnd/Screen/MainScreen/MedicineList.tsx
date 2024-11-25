import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CustomText from '../../Function/CustomText';
import {MedicineListContext} from '../../Function/MainListContext';

import {NavigationBar} from '../Commonness/NavigationBar';

import Config from 'react-native-config';
import axios from 'axios';
import InfoModal from '../../Function/InfoModal';
import {stopTTS} from '../../initializeTtsListeners';

//검색
const MedicineList = ({navigation, medicineName, category}) => {
  const medicineListContext = useContext(MedicineListContext);
  if (!medicineListContext) {
    throw new Error(
      'MedicineListContext must be used within a MedicineListProvider',
    );
  }

  const {text, setText} = medicineListContext;
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [arrayItem, setArrayItem] = useState([]);
  const [filterChange, setFilterChange] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    const fetchMedicineData = async () => {
      setLoading(true);
      try {
        const queryParam = category
          ? `${category}=${medicineName}`
          : `efcyQesitm=${medicineName}`;
        const endpoint = `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=${Config.React_APP_API_KEY}&${queryParam}&numOfRows=30&type=json`;
        console.log('endpoint:', endpoint);

        const response = await axios.get(endpoint);

        if (response.data?.body?.items) {
          const data = response.data.body.items;
          setArrayItem(data);
          setFilteredData(data);
        } else {
          console.warn('API 응답에 items가 없습니다:', response.data);
          setArrayItem([]);
          setFilteredData([]);
        }
      } catch (error) {
        if (error.response) {
          console.error('API 요청 오류:', error.response.data);
        } else {
          console.error('네트워크 오류 또는 기타 문제:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineData();
  }, [category, medicineName]);

  // 모달 열기
  const openModal = item => {
    const updatedItem = filteredData.find(
      medicine => medicine.itemSeq === item.itemSeq,
    );
    setSelectedItem(updatedItem || item);
    setModalVisible(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
    if (selectedItem.isFavorite) {
      stopTTS();
    }
  };

  // 즐겨찾기 상태 업데이트
  const handleFavoriteStatusChange = updatedItem => {
    const updatedFilteredData = filteredData.map(item =>
      item.itemSeq === updatedItem.itemSeq ? updatedItem : item,
    );
    setFilteredData(updatedFilteredData);
    setSelectedItem(updatedItem);
  };

  // 데이터 정렬 (가나다순 시작)
  useEffect(() => {
    if (arrayItem.length > 0) {
      const sortedData = [...arrayItem].sort((a, b) =>
        a.itemName.localeCompare(b.itemName, 'ko'),
      );
      setFilteredData(sortedData);
    }
  }, [arrayItem]);

  // 필터 체인지
  const changeFilter = () => {
    const sortedData = [...arrayItem].sort((a, b) => {
      if (filterChange) {
        return !a.itemImage && b.itemImage ? 1 : -1;
      }
      return a.itemName.localeCompare(b.itemName, 'ko');
    });
    setFilteredData(sortedData);
    setFilterChange(!filterChange);
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

        <TouchableOpacity onPress={changeFilter} style={Styles.sort_filter}>
          <Image
            source={
              filterChange
                ? require('../../Image/filter.png')
                : require('../../Image/filterimage.png')
            }
          />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#b4b4b4" />
        ) : filteredData.length > 0 ? (
          <ScrollView contentContainerStyle={Styles.medicineList}>
            {filteredData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={Styles.medicineItem}
                onPress={() => openModal(item)}>
                <View>
                  <Image
                    source={{
                      uri: item.itemImage || 'https://via.placeholder.com/100',
                    }}
                    style={Styles.medicineImage}
                  />
                </View>
                <CustomText style={Styles.medicineText}>
                  {item.itemName}
                </CustomText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              width: '100%',
              height: '75%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <CustomText style={{fontSize: 25, color: 'grey'}}>
              조회된 약이 없습니다. :/
            </CustomText>
          </View>
        )}
        <InfoModal
          visible={modalVisible}
          selectedItem={selectedItem}
          onFavoriteStatusChange={handleFavoriteStatusChange}
          onClose={closeModal}
        />
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
    left: '40%',
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
    borderColor: 'blue',
    borderWidth: 1,
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
    marginTop: '8%',
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default MedicineList;
