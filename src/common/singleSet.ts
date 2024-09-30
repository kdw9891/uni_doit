import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.error(e.message);
  }
};

/**
//사용방법

// 데이터 저장하기
  await storeData('user-name', 'John Doe');
  await storeData('user-age', 30);
  await storeData('user-preferences', { theme: 'dark', notifications: true });

// 데이터 불러오기
  const userName = await getData('user-name');
  console.log(userName); // 'John Doe'

  const userAge = await getData('user-age');
  console.log(userAge); // 30

  const userPreferences = await getData('user-preferences');
  console.log(userPreferences); // { theme: 'dark', notifications: true }

// 데이터 삭제하기
  await removeData('user-name');
  await removeData('user-age');
  await removeData('user-preferences');
 */
