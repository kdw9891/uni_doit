import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyValuePair = [string, any];

export const multiStoreData = async (keyValuePairs: KeyValuePair[]) => {
  try {
    const pairs: [string, string][] = keyValuePairs.map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
  } catch (e: any) {
    console.error('Error in multiStoreData:', e.message);
  }
};

export const multiGetData = async (
  keys: string[],
): Promise<[string, any][]> => {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    return pairs.map(([key, value]) => [key, value ? JSON.parse(value) : null]);
  } catch (e: any) {
    console.error('Error in multiGetData:', e.message);
    return [];
  }
};

export const multiRemoveData = async (keys: string[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e: any) {
    console.error('Error in multiRemoveData:', e.message);
  }
};

/**
 * 사용방법

// 여러 데이터 저장하기
  await multiStoreData([
    ['user-id', user.userId],
    ['user-name', user.userName],
    ['user-lang', user.nationCode],
    // ... 기타 키-값 쌍
  ]);

// 여러 데이터 불러오기
  const userData = await multiGetData(['user-id', 'user-name', 'user-lang']);
  console.log(userData);

// 여러 데이터 삭제하기
  await multiRemoveData(['user-id', 'user-name', 'user-lang']);
  
 */
