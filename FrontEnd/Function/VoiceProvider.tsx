import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VoiceContext = createContext();

export const VoiceProvider = ({children}) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const fetchVoiceStatus = async () => {
    try {
      const result = await AsyncStorage.getItem('check-voice');
      setIsVoiceEnabled(result === 'true'); // 문자열 "true"를 확인하고 불리언 변환
    } catch (error) {
      console.error('Error fetching voice status:', error);
    }
  };

  useEffect(() => {
    fetchVoiceStatus();
  }, []);

  return (
    <VoiceContext.Provider value={{isVoiceEnabled, setIsVoiceEnabled}}>
      {children}
    </VoiceContext.Provider>
  );
};
