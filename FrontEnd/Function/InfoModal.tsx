// PillModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {MedicineListBox} from './ListLike';

const InfoModal = ({visible, selectedItem, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={Styles.modalMainContainer}>
        <View style={Styles.modalSubContainer}>
          <MedicineListBox />
          <View style={Styles.modalbox}>
            <Text style={Styles.modalTitle}>
              {selectedItem?.itemName || '약 이름'}
            </Text>
            <View style={Styles.imagecontainer}>
              <Image
                source={{
                  uri:
                    selectedItem?.itemImage ||
                    'https://via.placeholder.com/150',
                }}
                style={Styles.libraryimage}
              />
            </View>
          </View>

          <ScrollView style={Styles.modalThdContainer}>
            <View style={Styles.infoBox}>
              <Text style={Styles.infoTitle}>효능</Text>
              <Text>{selectedItem?.efcyQesitm || '정보 없음'}</Text>
            </View>

            <View style={Styles.infoBox}>
              <Text style={Styles.infoTitle}>주의사항</Text>
              <Text>{selectedItem?.atpnQesitm || '정보 없음'}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity style={Styles.modalCloseBtn} onPress={onClose}>
            <Text style={Styles.modalCloseBtnText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  modalThdContainer: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 16,
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
    backgroundColor: 'white',
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
    marginTop: '5%',
    alignItems: 'center',
  },

  libraryimage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default InfoModal;