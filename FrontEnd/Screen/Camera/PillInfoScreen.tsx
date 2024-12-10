import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationBar} from '../Commonness/NavigationBar';

const PillInfoScreen = ({navigation}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        {/* 상단 제목 */}
        <View style={styles.header}>
          <Text style={styles.headerText}>찍은 약 이미지</Text>
          <TouchableOpacity>
            <Image
              source={{uri: 'https://icon-url-for-refresh.png'}}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 약 이미지와 정보 */}
        <View style={styles.infoContainer}>
          {/* 약 이미지 */}
          <Image
            source={{uri: 'https://pill-image-url.png'}} // 실제 약 이미지를 이 URL로 대체
            style={styles.pillImage}
          />

          {/* 약 정보 */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>사진의 이미지와 90% 유사해요</Text>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>이름</Text>
                <Text style={styles.infoValue}>타이레놀 500mg</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>주성분</Text>
                <Text style={styles.infoValue}>아세트아미노펜</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>효능 효과</Text>
                <Text style={styles.infoValue}>해열, 진통, 소염</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>복용법</Text>
                <Text style={styles.infoValue}>성인 하루 3회, 1회 2정</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 유사한 약 */}
        <View style={styles.similarPillsContainer}>
          <Text style={styles.similarPillsTitle}>유사한 약들</Text>
          <View style={styles.similarPillsList}>
            <TouchableOpacity style={styles.similarPill}>
              <Image
                source={{uri: 'https://similar-pill1-url.png'}} // 유사 약 이미지 URL
                style={styles.similarPillImage}
              />
              <Text style={styles.similarPillLabel}>타이레놀</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.similarPill}>
              <Image
                source={{uri: 'https://similar-pill2-url.png'}}
                style={styles.similarPillImage}
              />
              <Text style={styles.similarPillLabel}>판콜</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.similarPill}>
              <Image
                source={{uri: 'https://similar-pill3-url.png'}}
                style={styles.similarPillImage}
              />
              <Text style={styles.similarPillLabel}>벤그립</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavigationBar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  refreshIcon: {
    width: 24,
    height: 24,
  },
  infoContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  pillImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  infoList: {
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  similarPillsContainer: {
    marginTop: 16,
  },
  similarPillsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  similarPillsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  similarPill: {
    alignItems: 'center',
    width: 80,
  },
  similarPillImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  similarPillLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default PillInfoScreen;
