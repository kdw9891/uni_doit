import {forwardRef, useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import InputStyles from './InputStyles';

const Input = forwardRef((props: any, ref: any) => {
  const {style: _style, form, name, defaultValue, required, title, titleText, titleNumber, subTitle, onPress, keyboardType, showHeader = true, ...rest} = props;
  const commonStyle = {borderWidth: 1, paddingLeft: 15, minHeight: 52};
  const defaultStyle = required
    ? {...commonStyle, borderColor: '#c8d4de', backgroundColor: '#e8f4fe'}
    : {...commonStyle, borderColor: '#ddd'};
  const requiredStyle = {...commonStyle, borderColor: "red"};
  const [style, setStyle] = useState<any>({...defaultStyle, ..._style});
  const [value, setValue] = useState<string>('');
  const valueRef = useRef<string>('');

  form.setFnDic[name] = (val: string) => {
    if (value != val) {
      setValue(val);
      valueRef.current = val;
      return;
    }

    setValue(valueRef.current);

    setTimeout(() => {
      setValue(val);
      valueRef.current = val;
    }, 0);
  };

  form.requiredFnDic[name] = () => {
    const isFilled = required ? !!valueRef.current : true;
    if (isFilled) {
      setStyle({...style, ...defaultStyle});
    } else {
      setStyle({...style, ...requiredStyle});
    }

    return isFilled;
  };

  const textChangeHandler = (text: string) => {
    valueRef.current = text;
    form.setValue(name, text);
  };

  const titleTxt = titleText ? ` ( ${titleText} )` : '';

  const titleNum = titleNumber ? ` ( ${titleNumber.toFixed(2)} )` : '';
  return (
    <>
      {showHeader && (
        <View style={[InputStyles.inputContainer]}>
          <Text style={[InputStyles.inputTitle]}>
            {title}
            {titleTxt}
            {titleNum}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={[InputStyles.inputSubTitle]}>{subTitle}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        ref={ref}
        defaultValue={value}
        onChangeText={textChangeHandler}
        keyboardType={keyboardType}
        style={style}
        {...rest}
      />
    </>
  );
});

export default Input;
