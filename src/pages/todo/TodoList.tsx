import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {setWidth, fontSize} from '../../common/deviceUtils';
import TodoItem from './TodoItem';
import api from '../../common/api';
import {globalContext} from '../../common/globalContext';
import moment from 'moment';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Array<any>>([]);
  const [isTodoModalVisible, setIsTodoModalVisible] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 할 일 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, [selectedDate]);

  const fetchTodos = async () => {
    try {
      const response = await api<any>('get', '/todo/list', {
        user_id: globalContext.user.user_id,
        task_date: moment(selectedDate).format('YYYY-MM-DD'),
      });

      if (response.data && response.data.length > 0) {
        const sortedTodos = response.data
          .map((task: any) => ({
            id: task.task_id.toString(),
            title: task.task_title,
            isChecked: task.is_completed == 1,
            taskOrder: task.task_order,
          }))
          .sort((a: any, b: any) => a.taskOrder - b.taskOrder);

        setTodos(sortedTodos);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '할 일 데이터를 가져오는 데 실패했습니다.');
    }
  };

  // 할 일 추가
  const addTodo = async () => {
    if (newTodoTitle.trim() === '') {
      Alert.alert('오류', '할 일을 입력해주세요.');
      return;
    }

    try {
      await api('post', '/todo/insert', undefined, {
        user_id: globalContext.user.user_id,
        task_title: newTodoTitle,
        task_date: moment(selectedDate).format('YYYY-MM-DD'),
      });

    } catch (error) {
      console.error(error);
      Alert.alert('오류', '할 일을 추가하는 데 실패했습니다.');
    } finally {
      setNewTodoTitle(''); // 항상 입력 초기화
      setIsTodoModalVisible(false); // 항상 팝업 닫기
      fetchTodos(); // 목록 새로고침
    }
  };

  // 할 일 수정
  const editTodo = async () => {
    if (!editingTodo || editingTodo.title.trim() === '') {
      Alert.alert('오류', '할 일을 입력해주세요.');
      return;
    }

    try {
      await api('put', '/todo/update', undefined, {
        user_id: globalContext.user.user_id,
        task_id: editingTodo.id,
        task_title: editingTodo.title,
      });

    } catch (error) {
      console.error(error);
      Alert.alert('오류', '할 일을 수정하는 데 실패했습니다.');
    } finally {
      setIsTodoModalVisible(false); // 항상 팝업 닫기
      setEditingTodo(null); // 항상 상태 초기화
      fetchTodos(); // 목록 새로고침
    }
  };

  // 할 일 삭제
  const deleteTodo = async (id: string) => {
    try {
      await api('delete', '/todo/delete', undefined, {
        user_id: globalContext.user.user_id,
        task_id: parseInt(id, 10),
      });

      Alert.alert('성공', '할 일이 삭제되었습니다.');
      fetchTodos();
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '할 일을 삭제하는 데 실패했습니다.');
    }
  };

  // 할 일 완료 상태 토글
  const toggleComplete = async (id: string) => {
    try {
      await api('put', '/todo/completed', {
        user_id: globalContext.user.user_id,
        task_id: parseInt(id, 10),
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '완료 상태를 변경하는 데 실패했습니다.');
    }
  };

  // 아이템 렌더링
  const renderItem = ({item}: {item: any}) => (
    <View style={{paddingHorizontal: 15, padding: 5}}>
      <TodoItem
        title={item.title}
        isChecked={item.isChecked}
        onCheck={() => !item.isChecked && toggleComplete(item.id)}
        onDelete={() => deleteTodo(item.id)}
        onEdit={() => {
          if (!item.isChecked) {
            setEditingTodo(item);
            setIsTodoModalVisible(true);
          } else {
            Alert.alert('수정 불가', '완료된 할 일은 수정할 수 없습니다.');
          }
        }}
      />
      {/* {item.isChecked && (
        <Text style={styles.completedText}>완료된 항목 (수정 불가)</Text>
      )} */}
    </View>
  );

  return (
    <View style={{flex: 10}}>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 0.5,
          borderBottomColor: palette.gray[300],
        }}>
        <Header
          centerIconProps={{
            iconName: 'null',
            iconType: 'AntDesign',
            imagePath: require('../../assets/newimages/todohead.png'),
            size: setWidth(45),
          }}
          rightIconProps={{
            iconName: 'plus',
            iconType: 'Entypo',
            onPress: () => {
              setNewTodoTitle('');
              setEditingTodo(null);
              setIsTodoModalVisible(true);
            },
          }}
        />
      </View>
      <View style={{flex: 9, width: '100%'}}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>할 일이 없습니다.</Text>
            </View>
          )}
          contentContainerStyle={
            todos.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}
          }
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isTodoModalVisible}
        onRequestClose={() => setIsTodoModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingTodo ? '할 일 수정' : '할 일 추가'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="할 일을 입력해주세요."
              keyboardType='default'
              value={editingTodo ? editingTodo.title : newTodoTitle}
              onChangeText={text =>
                editingTodo
                  ? setEditingTodo({...editingTodo, title: text})
                  : setNewTodoTitle(text)
              }
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={editingTodo ? editTodo : addTodo}>
                <Text style={styles.modalButtonText}>
                  {editingTodo ? '수정' : '추가'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsTodoModalVisible(false)}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: palette.gray[600],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: fontSize(48),
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    fontSize: fontSize(38),
    borderWidth: 1,
    borderColor: palette.gray[300],
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    flex: 1,
    backgroundColor: palette.blue[600],
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: fontSize(34),
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: palette.gray[300],
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: fontSize(34),
    fontWeight: 'bold',
  },
  completedText: {
    color: 'gray',
    fontSize: fontSize(32),
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default TodoList;
