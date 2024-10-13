import React, {useState} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {setHeight, setWidth} from '../../common/deviceUtils';

interface ImageIconProps {
  imagePath: any;
  altText?: string;
  onClick: () => void;
}

const ImageIcon: React.FC<ImageIconProps> = ({imagePath, altText, onClick}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
    onClick();
  };

  return (
    <TouchableOpacity onPressIn={handleTouchStart} onPressOut={handleTouchEnd}>
      <Image
        source={imagePath}
        style={styles.image}
        accessibilityLabel={altText}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: setWidth(45),
    height: setHeight(45),
    resizeMode: 'contain',
  },
});

export default ImageIcon;
