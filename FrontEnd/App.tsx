import React from 'react';
import { SafeAreaView } from 'react-native';
import Login from './Screen/LoginScreen/Login';  // Login.tsx가 위치한 경로를 명확하게 지정

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <Login />
    </SafeAreaView>
  );
};

export default App;

