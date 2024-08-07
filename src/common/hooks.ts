import { useRef } from "react";
import { Dictionary } from "./types";

export const useFormRef = (): [Dictionary, (data: Dictionary) => void] => {
  const form = useRef<Dictionary>({ 
    data: {} as Dictionary,
    setFnDic: {} as Dictionary,
    requiredFnDic: {} as Dictionary,
    required: () => {
      let allFilled = true;
      for (let key in form.current.requiredFnDic) {
        allFilled = form.current.requiredFnDic[key]() && allFilled;
      }

      return allFilled;
    },
    setValue: (name: string, value: any) => {
      form.current.data[name] = value;
    }
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