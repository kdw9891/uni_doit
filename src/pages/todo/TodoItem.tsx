import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { setWidth } from '../../common/deviceUtils';
import { palette } from '../../common/palette';

interface TodoItemProps {
  title: string;
  isChecked: boolean; // 완료 여부를 나타내는 상태
  onCheck: () => void; // 체크 이벤트
  onEdit: () => void; // 수정 이벤트
  onDelete: () => void; // 삭제 이벤트
}

const TodoItem: React.FC<TodoItemProps> = ({ title, isChecked, onCheck, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCheck} style={styles.checkButton}>
        <FontAwesome
          name={isChecked ? 'check-square' : 'square-o'}
          size={setWidth(15)}
          color={palette.black}
        />
      </TouchableOpacity>
      <Text style={[styles.title, isChecked && styles.checkedTitle]}>{title}</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Ionicons name="pencil" size={setWidth(15)} color={palette.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Feather name="trash" size={setWidth(15)} color={palette.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkButton: {
    marginRight: 10,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  checkedTitle: {
    textDecorationLine: 'line-through',
    color: palette.gray[500],
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default TodoItem;