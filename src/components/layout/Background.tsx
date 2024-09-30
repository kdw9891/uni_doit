import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView} from 'react-native';
import {palette} from '../../common/palette';

interface BackgroundProps {
  children: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.Background}
        behavior={"height"}
        keyboardVerticalOffset={70}
      >
        {children}
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: palette.white,
    width: '100%',
    height: '100%',
  },
});
