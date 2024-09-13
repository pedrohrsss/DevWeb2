import React, { useEffect } from "react";
import { useState } from "react";

type LocalStorageType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T>>
];

const useLocalStorage = <T>(
  key: string,
  intialValue?: T | undefined
): LocalStorageType<T | undefined> => {
  const [state, setState] = useState<T | undefined>(() => {
    if (!intialValue) return;
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : intialValue;
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;