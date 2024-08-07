import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {palette} from '../../common/palette';

const ScreenLoading: React.FC = () => {
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimer(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      {showTimer ? (
        <View>
          <ActivityIndicator size="large" color={palette.black} />
        </View>
      ) : (
        <ActivityIndicator size="large" color={palette.black} />
      )}
    </View>
  );
};

export default ScreenLoading;
