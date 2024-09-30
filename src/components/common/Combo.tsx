import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Dictionary} from '../../common/types';
import {executeIdle, getMapCache} from '../../common/utility';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ComboStyles from './ComboStyles';

const Combo = forwardRef((props: any, ref: any) => {
  let {style: _style, innerStyle, form, name, selectedValue, required, onValueChange, mapCode: _mapCode, category: _category, title, titleText, titleNumber, subTitle, onPress, keyboardType, showHeader = true, ...rest} = props;
  const commonStyle = {borderWidth: 1};
  const defaultStyle = required
    ? {...commonStyle, borderColor: '#c8d4de', backgroundColor: '#e8f4fe'}
    : {...commonStyle, borderColor: '#ddd'};
  const requiredStyle = {...commonStyle, borderColor: 'red'};
  const [style, setStyle] = useState<any>({...defaultStyle, ..._style});
  const [mapCode, setMapCode] = useState<any>(_mapCode);
  const [category, setCategory] = useState<any>(_category);
  const [maps, setMaps] = useState<Dictionary[]>([]);
  const [value, setValue] = useState<string>(selectedValue);

  form.setFnDic[name] = (val: string) => {
    setValue(val);
  };

  form.requiredFnDic[name] = () => {
    const isFilled = required ? !!value : true;
    if (isFilled) {
      setStyle({...style, ...defaultStyle});
    } else {
      setStyle({...style, ...requiredStyle});
    }

    return isFilled;
  };

  const valueChangeHandler = (itemValue: string, itemIndex: number) => {
    const v = itemValue == '###' ? '' : itemValue;

    setValue(v);
    form.setValue(name, v);

    if (onValueChange) {
      onValueChange(itemValue, itemIndex);
    }
  };

  useImperativeHandle(ref, () => ({
    setValue: (val: string) => {
      setValue(val);
    },
    setEmpty: () => {
      setValue('');
    },
    getValue: () => value,
    setMaps,
    setMapCode,
    setCategory,
  }));

  useEffect(() => {
    if (!mapCode) return;

    if (props.children) return;

    executeIdle(() => {
      getMapCache(mapCode, category).then((result: any) => {
        const first = {value: '###', label: props.placeholder, color: '#555'};
        if (result.data && result.data.length) {
          // if(props.isLang){
          //   result.data.forEach((map: Dictionary) => {
          //     map.label = getLang(map.label);
          //   });
          // }

          setMaps([...[first], ...result.data]);
        } else {
          setMaps([first]);
          setValue(first.value);
        }
      });
    });
  }, [mapCode, category]);

  const titleTxt = titleText ? ` ( ${titleText} )` : '';

  const titleNum = titleNumber ? ` ( ${titleNumber.toFixed(2)} )` : '';

  return (
    <>
      {showHeader && (
        <View style={[ComboStyles.comboContainer]}>
          <Text style={[ComboStyles.comboTitle]}>
            {title}
            {titleTxt}
            {titleNum}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={[ComboStyles.comboSubtitle]}>{subTitle}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={style}>
        <Picker
          ref={ref}
          selectedValue={value}
          onValueChange={valueChangeHandler}
          style={innerStyle}
          {...rest}>
          {props.children ||
            maps.map((map: Dictionary, index: number) => (
              <Picker.Item
                key={index}
                label={map.label}
                value={map.value}
                color={map.color}
              />
            ))}
        </Picker>
      </View>
    </>
  );
});

export default Combo;
