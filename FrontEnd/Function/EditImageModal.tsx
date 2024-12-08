import React from 'react';
import {Modal, View, Image, TextInput, Button, StyleSheet} from 'react-native';
import CustomText from './CustomText';

interface EditImageModalProps {
  visible: boolean;
  image: any;
  shape: string;
  color: string;
  descript: string;
  onShapeChange: (text: string) => void;
  onColorChange: (text: string) => void;
  onDescriptChange: (text: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditImageModal = ({
  visible,
  image,
  shape,
  color,
  descript,
  onShapeChange,
  onColorChange,
  onDescriptChange,
  onClose,
  onSave,
}: EditImageModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* 클릭한 이미지 */}
          {image && (
            <Image
              source={{uri: `data:image/jpeg;base64,${image.image}`}}
              style={styles.modalImage}
            />
          )}

          {/* 데이터 수정 입력 */}
          <CustomText style={styles.label}>모양:</CustomText>
          <TextInput
            style={styles.input}
            value={shape}
            onChangeText={onShapeChange}
          />

          <CustomText style={styles.label}>색상:</CustomText>
          <TextInput
            style={styles.input}
            value={color}
            onChangeText={onColorChange}
          />

          <CustomText style={styles.label}>각인:</CustomText>
          <TextInput
            style={styles.input}
            value={descript}
            onChangeText={onDescriptChange}
          />

          {/* 버튼 */}
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={onSave} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditImageModal;
