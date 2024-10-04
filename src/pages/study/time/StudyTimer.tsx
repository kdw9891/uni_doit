import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Svg, Circle} from 'react-native-svg';
import { palette } from '../../../common/palette';

const radius = 100;
const circumference = 2 * Math.PI * radius;

const StudyTimer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  let interval: NodeJS.Timeout | undefined; // interval 변수를 undefined로 초기화

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isRunning, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(60);
  };

  const strokeDashoffset = circumference - (circumference * seconds) / 60;

  return (
    <View style={styles.container}>
      <Svg height="220" width="220" viewBox="0 0 220 220">
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke="gray"
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke={palette.blue[300]}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.timeText}>{seconds}s</Text>
      <View style={styles.buttons}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Pause" onPress={handlePause} />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    marginTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default StudyTimer;
