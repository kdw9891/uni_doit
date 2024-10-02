import { useRef, useState, useCallback } from "react";
import { Dictionary } from "./types";

export const useFormRef = (): [Dictionary, (data: Dictionary) => void] => {
  const form = useRef<Dictionary>({ 
    data: {} as Dictionary,
    setFnDic: {} as Dictionary,
    requiredFnDic: {} as Dictionary,
    setColorFnDic: {} as Dictionary,
    clearFnDic: {} as Dictionary,
    required: () => {
      let allFilled = true;
      
      for (let key in form.current.requiredFnDic) {
        allFilled = form.current.requiredFnDic[key]() && allFilled;
      }

      return allFilled;
    },
    setValue: (name: string, value: any) => {
      form.current.data[name] = value;
    },
    clear: () => {
      form.current.data = {};
      for (let key in form.current.clearFnDic) {
        form.current.clearFnDic[key]();
      }
    },
    
  });
  const setForm = (data: Dictionary) => {
    form.current.data = data;
    setTimeout(() => {
      for (let key in form.current.setFnDic) {
        form.current.setFnDic[key](data[key]);
      }
    }, 10);
  };

  return [form.current, setForm];
}

export function useModal(initialState: boolean = false): {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
} {
  const [isVisible, setIsVisible] = useState(initialState);

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return { isVisible, openModal, closeModal };
}
