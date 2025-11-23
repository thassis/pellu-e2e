import React, { createContext, ReactNode, useContext, useState } from "react";
import { PetType } from "../../types/offer.type";

type BottomSheetType = 'comments' | 'pet-filter';

type CommentData = {
  postId: string;
}

type PetFilterData = {
  handleFilter: (petType: PetType | undefined, ongId: string | undefined) => void;
}

type OpenSheet = {
  title: string;
  commentData?: CommentData;
  petFilterData?: PetFilterData;
  type: BottomSheetType;
}

interface BottomSheetContextProps {
  visible: boolean;
  openSheet: (props: OpenSheet) => void;
  closeSheet: () => void;
  title: string;
  commentData?: CommentData;
  petFilterData?: PetFilterData;
  type: BottomSheetType;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [type, setType] = useState<BottomSheetType>('comments');
  const [commentData, setCommentData] = useState<CommentData | undefined>(undefined);
  const [petFilterData, setPetFilterData] = useState<PetFilterData | undefined>(undefined);

  const openSheet = ({
    title: newTitle,
    commentData: newCommentData,
    type: newType,
    petFilterData: newPetFilterData
  }: OpenSheet) => {
    setTitle(newTitle);
    setCommentData(newCommentData);
    setPetFilterData(newPetFilterData);
    setType(newType);
    setVisible(true);
  };

  const closeSheet = () => {
    setVisible(false);
    setType('comments');
    setTitle('');
    setPostId('');
    setCommentData(undefined);
    setPetFilterData(undefined);
  };

  return (
    <BottomSheetContext.Provider value={{
      title,
      visible,
      openSheet,
      closeSheet,
      commentData,
      petFilterData,
      type,
    }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextProps => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};