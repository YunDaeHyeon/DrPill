/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {MedicineListProvider} from '../../Function/MainListContext'; // 경로는 프로젝트 구조에 따라 조정

import MedicineList from './MedicineList';

const MedicineInfo = ({route, navigation}) => {
  const {medicineName} = route.params; // 전달된 medicineName을 받습니다.

  return (
    <MedicineListProvider>
      <MedicineList medicineName={medicineName} navigation={navigation} />
    </MedicineListProvider>
  );
};

export default MedicineInfo;
