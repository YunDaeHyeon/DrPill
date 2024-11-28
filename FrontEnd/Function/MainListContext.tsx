import React, {createContext, useState, ReactNode, useEffect} from 'react';

// Context의 타입 정의
interface MedicineListContextType {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isListOpen: boolean;
  toggleListOpen: (imagePath?: string) => void;
  selectedImage: string | null;
  selectedButton: string | null;
  handleButtonPress: (buttonId: string) => void;
  libraryImage: string | null; // 약 도서관 이미지 상태
  addImageToLibrary: (imagePath: string) => void; // 이미지 추가 함수
}

// Context 생성
export const MedicineListContext = createContext<
  MedicineListContextType | undefined
>(undefined);

interface MedicineListProviderProps {
  children: ReactNode;
}

export const MedicineListProvider = ({children}: MedicineListProviderProps) => {
  const [text, setText] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 선택된 이미지 경로
  const [selectedButton, setSelectedButton] = useState<string | null>(null); // 선택된 버튼 상태
  const [libraryImage, setLibraryImage] = useState<string | null>(null);

  const toggleListOpen = (imagePath?: string) => {
    setSelectedImage(imagePath || null); // 이미지 경로 설정 (없으면 null)
    setIsListOpen(prev => !prev); // 모달 열기/닫기
  };

  // 버튼 클릭 시 선택된 버튼 업데이트
  const handleButtonPress = (buttonId: string) => {
    setSelectedButton(buttonId); // 선택된 버튼 상태 변경
  };

  // 이미지 경로 업데이트
  const addImageToLibrary = (imagePath: string) => {
    setLibraryImage(imagePath); // 새로운 이미지 경로를 저장
    console.log(imagePath);
  };

  // libraryImage가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log(libraryImage); // 상태가 변경된 후에 출력
  }, [libraryImage]); // libraryImage가 변경될 때마다 실행

  return (
    <MedicineListContext.Provider
      value={{
        text,
        setText,
        isListOpen,
        toggleListOpen,
        selectedImage,
        selectedButton,
        handleButtonPress, // 버튼 클릭 처리 함수 제공
        libraryImage, // 약 도서관 이미지 상태
        addImageToLibrary, // 이미지 추가 함수
      }}>
      {children}
    </MedicineListContext.Provider>
  );
};
