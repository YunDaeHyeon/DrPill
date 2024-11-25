import Tts from 'react-native-tts';

// TTS 세팅
export const initializeTtsListeners = async () => {
  // TTS 세팅 확인
  Tts.getInitStatus().then(
    e => {
      // Tts.setDefaultLanguage('ko-KR');
      console.log('TTS 세팅 완료');
    },
    error => {
      // TTS 엔진이 설치되지 않을때
      if (error.code === 'no_engine') {
        console.log('엔진이 설치되지 않았습니다.');
        Tts.requestInstallEngine();
      }
    },
  );

  // 스피킹 레이트 설정 (0.01 ~ 0.99, 1에 가까울수록 빠름)
  Tts.setDefaultRate(1, true);

  Tts.setIgnoreSilentSwitch('ignore');

  // 피치 설정 (0.5 ~ 2.0, 2에 가까울수록 음 높음)
  Tts.setDefaultPitch(1.0);

  // TTS 이벤트 정의
  // TTS 시작
  Tts.addEventListener('tts-start', event => {
    console.log('음성 읽기 시작 : ', event);
  });

  // TTS 실행중
  Tts.addEventListener('tts-progress', event => {
    // console.log('TTS progress: ', event) // Uncomment to log progress events
  });

  // TTS 끝
  Tts.addEventListener('tts-finish', event => {
    console.log('음성 읽기 종료 : ', event);
  });

  // TTS 취소
  Tts.addEventListener('tts-cancel', event => {
    console.log('음성 읽기 취소 : ', event);
  });
};

// TTS 사용 인터페이스
export const playTTS = async (message: string) => {
  Tts.getInitStatus().then(
    e => {
      console.log('TTS 세팅 완료'); // TTS is initialized successfully
    },
    err => {
      // If there is no TTS engine installed, request to install one
      if (err.code === 'no_engine') {
        console.log('TTS 엔진이 설정되어있지 않습니다.');
        Tts.requestInstallEngine();
      }
    },
  );

  Tts.speak(message);
};
