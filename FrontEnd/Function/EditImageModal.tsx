import React, {useEffect, useState, useMemo} from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

interface EditImageModalProps {
  visible: boolean;
  image: string; // Base64 or URI for the captured image
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
  onClose,
}: EditImageModalProps) => {
  const [results, setResults] = useState<
    Array<{
      productImage: string;
      name: string;
      generalOrSpecial: string;
    }>
  >([]);
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const sendDataToBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://ec2-43-203-17-224.ap-northeast-2.compute.amazonaws.com:3000/search-pill',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({shape, color, descript}),
        },
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        Alert.alert('오류', '서버와 통신에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
      Alert.alert('오류', '서버와의 연결 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      sendDataToBackend();
    }
  }, [visible]);

  // Primary Result와 Similar Results를 분리
  const primaryResult = useMemo(() => results[0], [results]);
  const similarResults = useMemo(() => results.slice(1), [results]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* Captured Image */}
          {!loading &&
            image && ( // 로딩 중이 아닐 때만 이미지 표시
              <Image
                source={{uri: `data:image/jpeg;base64,${image}`}}
                style={styles.capturedImage}
              />
            )}

          {/* Loading Indicator */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3AA8F8" />
              <Text style={styles.loadingText}>검색 중...</Text>
            </View>
          ) : (
            <>
              {/* Section Header */}
              <Text style={styles.sectionHeader}>
                아래와 같은 약들이 검색되었어요.
              </Text>

              {/* Most Accurate Result */}
              {primaryResult && (
                <View style={styles.card}>
                  <Image
                    source={{uri: primaryResult.productImage}}
                    style={styles.primaryResultImage}
                  />
                  <View style={styles.cardDetails}>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {primaryResult.name}
                    </Text>
                    <Text style={styles.cardType}>
                      {primaryResult.generalOrSpecial}
                    </Text>
                  </View>
                </View>
              )}

              {/* Similar Results */}
              <Text style={styles.similarHeader}>유사한 약품</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.similarResultsContainer}>
                  {similarResults.map((result, index) => (
                    <View
                      key={index}
                      style={[styles.similarCard, {width: 120}]}>
                      <Image
                        source={{uri: result.productImage}}
                        style={styles.similarResultImage}
                      />
                      <Text
                        style={styles.cardName}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {result.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          )}

          {/* Close Button */}
          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#000',
  },
  capturedImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryResultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardDetails: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 14,
    textAlign: 'left',
    color: '#333',
  },
  cardType: {
    fontSize: 14,
    textAlign: 'left',
    color: '#666',
  },
  similarHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  similarResultsContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  similarCard: {
    alignItems: 'center',
    marginRight: 16,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  similarResultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    color: '#3AA8F8',
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
});

export default EditImageModal;
