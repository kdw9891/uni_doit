import {useNavigation} from '@react-navigation/core';
import {BackHandler} from 'react-native';

/**
 * 뒤로가기 버튼을 눌렀을때 처리되는 함수
 * @param {boolean} action : true 일 경우
 * @returns
 */
export const onPressBackBtn = (action: boolean) => {
  const backAction = (): boolean => {
    // 파라미터가 true이면 뒤로가기 버튼을 방지
    if (action) {
      return action;
    }
    // 파라미터가 false이면 뒤로가기 버튼 시 실제 뒤로가기를 수행
    else {
      useNavigation().goBack();
      return action;
    }
  };

  // BackHandler에 대해 이벤트 리스너를 등록
  BackHandler.addEventListener('hardwareBackPress', backAction);

  // BackHandler에 대해 이벤트 리스너를 제거
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', backAction);
  };
};
