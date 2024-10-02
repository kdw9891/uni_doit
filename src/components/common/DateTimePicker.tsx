import {forwardRef, useEffect, useRef, useState} from 'react';
import {setWidth} from '../../common/deviceUtils';
import {palette} from '../../common/palette';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DateTimePicker = forwardRef((props: any, ref: any) => {
  let {style: _style, iconStyle, form, name, defaultValue, required, formatFn, ...rest} = props;
  const commonStyle = {borderWidth: 1, paddingLeft: 15, flexGrow: 1, minHeight: 52};
  const defaultStyle = required
    ? {...commonStyle, borderColor: '#c8d4de', backgroundColor: '#e8f4fe'}
    : {...commonStyle, borderColor: '#ddd'};
  const requiredStyle = {...commonStyle, borderColor: 'red'};
  const [style, setStyle] = useState<any>({...defaultStyle, ..._style});
  const [value, setValue] = useState<string>('');
  const valueRef = useRef<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const clearRef = useRef<any>('');


  useEffect(() => {
    if(defaultValue) {
      valueRef.current = defaultValue;
      setValue(defaultValue);
      form.setValue(name, defaultValue);
    }
  },[defaultValue])

  const toggleDatePicker = (isShow: boolean) => {
    setDatePickerVisibility(isShow);
  };

  const confirmHandler = (date: Date) => {
    const d = formatFn ? formatFn(date) : defaultFormatFn(date);
    form.setValue(name, d);
    setValue(d);
    valueRef.current = d;

    toggleDatePicker(false);
  };

  const defaultFormatFn = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

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


  form.clearFnDic[name] = () => {
    clearRef.current.clear();
    setValue('')
    valueRef.current = '';
    
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          ref={clearRef}
          defaultValue={value}
          onChangeText={textChangeHandler}
          showSoftInputOnFocus={false}
          onTouchStart={() => {
            toggleDatePicker(true);
          }}
          style={style}
          {...rest}
        />
        <Pressable
          onPress={() => toggleDatePicker(true)}
          style={{...{position: 'absolute', right: 20, top: 15}, ...iconStyle}}>
          <Icon
            name="calendar"
            size={setWidth(32)}
            color={palette.black}
          />
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={confirmHandler}
        onCancel={() => toggleDatePicker(false)}
      />
    </>
  );
});

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

