import {Dimensions} from 'react-native';

// Android A90 에뮬레이터 크기
export const basicDimensions = {
  // 작업하고 있는 XD 스크린
  height: 976,
  width: 440,
};

// 화면 비율 계산
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const aspectRatio = screenWidth / screenHeight;

export const height = parseFloat(
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
);

export const width = parseFloat(
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
);

export const adjustedWidth = basicDimensions.width * aspectRatio;
export const adjustedHeight = screenWidth / aspectRatio; // 높이 비율 고정
