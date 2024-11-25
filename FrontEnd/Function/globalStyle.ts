import {Dimensions} from 'react-native';

// Android A90 에뮬레이터 크기
export const basicDimensions = {
  // 작업하고 있는 XD 스크린
  height: 976,
  width: 440,
};

export const height = parseFloat(
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
);

export const width = parseFloat(
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
);
