import {View, Pressable, Text, Animated, Dimensions} from 'react-native';
import {palette} from '../../common/palette';
import React from 'react';

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menus: string[];
  children?: React.ReactNode;
}

const Tabs = ({selectedIndex, onSelectHandler, menus, children}: Props) => {
  const width = Dimensions.get('window').width / menus.length;
  const animatedValue = React.useRef(
    new Animated.Value(selectedIndex * width),
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedIndex * width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: palette.white,
        borderTopWidth: 1,
        borderTopColor: palette.gray[200],
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          width: width,
          borderBottomWidth: 1,
          borderBottomColor: palette.black,
          transform: [{translateX: animatedValue}],
          bottom: 0,
        }}
      />
      {menus.map((v, i) => (
        <Pressable
          style={{
            flex: 1,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={v}
          onPress={() => {
            onSelectHandler(i);
          }}>
          <Text
            style={[
              {
                color:
                  selectedIndex === i ? palette.gray[700] : palette.skyBlue,
              },
            ]}>
            {v}
          </Text>
        </Pressable>
      ))}
      {children}
    </View>
  );
};

export default Tabs;
