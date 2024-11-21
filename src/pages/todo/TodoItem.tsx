import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setWidth} from '../../common/deviceUtils';
import {palette} from '../../common/palette';

interface TodoItemProps {
  title: string;
  isChecked: boolean; // 완료 여부
  onCheck: () => void; // 완료 처리
  onEdit: () => void; // 수정
  onDelete: () => void; // 삭제
}

const TodoItem: React.FC<TodoItemProps> = ({
  title,
  isChecked,
  onCheck,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCheck} style={styles.checkButton}>
        <FontAwesome
          name={isChecked ? 'check-square' : 'square-o'}
          size={setWidth(15)}
          color={palette.black}
        />
      </TouchableOpacity>
      <Text style={[styles.title, isChecked && styles.checkedTitle]}>
        {title}
      </Text>
      <View style={styles.icons}>
        {!isChecked && (
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <FontAwesome
              name="pencil"
              size={setWidth(15)}
              color={palette.blue[500]}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <FontAwesome name="trash" size={setWidth(15)} color={palette.red[500]} />
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
