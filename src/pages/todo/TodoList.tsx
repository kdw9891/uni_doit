import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {setWidth, setHeight, fontSize} from '../../common/deviceUtils';
import TodoItem from './TodoItem';
import api from '../../common/api';
import {globalContext} from '../../common/globalContext';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Array<any>>([]);
  const [isTodoModalVisible, setIsTodoModalVisible] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [editingTodo, setEditingTodo] = useState<any>(null);

  // 할 일 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api<any>('get', '/todo/list', { user_id: globalContext.user.user_id });
      if (response.data) {
        const sortedTodos = response.data
          .map((task: any) => ({
            id: task.task_id.toString(),
            title: task.task_title,
            isChecked: task.is_completed,
            taskOrder: task.task_order,
          }))
          .sort((a: any, b: any) => a.taskOrder - b.taskOrder);
        setTodos(sortedTodos);
      } else {
        Alert.alert('오류', '할 일 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', 'API 호출 중 문제가 발생했습니다.');
    }
  };

  // 할 일 추가
  const addTodo = async () => {
    if (newTodoTitle.trim() === '') {
      Alert.alert('오류', '할 일을 입력해주세요.');
      return;
    }

    try {
      await api<any>('post', '/todo/insert', {}, {
        user_id: globalContext.user.user_id,
        task_id: 0,
        task_title: newTodoTitle,
        task_date: new Date().toISOString().split('T')[0],
      });

      Alert.alert('성공', '할 일이 추가되었습니다.');
      setNewTodoTitle('');
      setIsTodoModalVisible(false);
      fetchTodos();
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '할 일을 추가하는 데 실패했습니다.');
    }
  };

  // 할 일 완료 상태 토글
 const toggleComplete = async (id: string, currentStatus: boolean) => {
  console.log("Toggle Complete Clicked:", { id, currentStatus });

  // 즉각적인 UI 업데이트
  setTodos(prevTodos =>
    prevTodos.map(todo =>
      todo.id === id ? { ...todo, isChecked: !currentStatus } : todo,
    ),
  );

  try {
    console.log("Sending API Request to /todo/completed with:", {
      user_id: globalContext.user.user_id,
      task_id: parseInt(id, 10),
    });

    const response = await api<any>('put', '/todo/completed', {
      user_id: globalContext.user.user_id,
      task_id: parseInt(id, 10),
    });

    console.log("API Response:", response);

    // 성공적으로 완료된 경우 데이터를 다시 가져옵니다.
    fetchTodos();
  } catch (error) {
    console.error('Error toggling completion:', error);

    // 실패한 경우 원래 상태로 복구
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isChecked: currentStatus } : todo,
      ),
    );

    Alert.alert('오류', '완료 상태를 변경하는 데 실패했습니다.');
  }
};


  // 할 일 삭제
  const deleteTodo = async (id: string) => {
    try {
      await api<any>('delete', '/todo/delete', {}, {
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

  // 할 일 수정
  const editTodo = async () => {
    if (!editingTodo || !editingTodo.title.trim()) {
      Alert.alert('오류', '할 일을 입력해주세요.');
      return;
    }

    try {
      await api<any>('put', '/todo/update', {}, {
        user_id: globalContext.user.user_id,
        task_id: parseInt(editingTodo.id, 10),
        task_title: editingTodo.title,
      });

      Alert.alert('성공', '할 일이 수정되었습니다.');
      setIsTodoModalVisible(false);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '할 일을 수정하는 데 실패했습니다.');
    }
  };

  // 아이템 렌더링
  const renderItem = ({item}: {item: any}) => (
    <View style={{paddingHorizontal: 15, padding: 5}}>
      <TodoItem
        title={item.title}
        isChecked={item.isChecked}
        onCheck={() => toggleComplete(item.id, item.isChecked)}
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setNewTodoTitle('');
          setEditingTodo(null);
          setIsTodoModalVisible(true);
        }}>
        <AntDesign name="plus" size={setWidth(20)} color={palette.white} />
      </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    right: setWidth(20),
    bottom: setHeight(20),
    width: setWidth(45),
    height: setHeight(45),
    backgroundColor: palette.blue[600],
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default TodoList;
