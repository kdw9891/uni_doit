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
import axios from 'axios';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {setWidth, setHeight, fontSize} from '../../common/deviceUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodoItem from './TodoItem';
import api from '../../common/api';
import {globalContext} from '../../common/globalContext';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Array<any>>([]);
  const [isTodoModalVisible, setIsTodoModalVisible] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  // API에서 데이터 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api<any>('get', '/todo/list', {
        user_id: globalContext.user.user_id,
      });

      console.log(response.data);

      if (response.data) {
        const apiTodos = response.data.map((task: any) => ({
          id: task.task_id.toString(),
          title: task.task_title,
          isChecked: task.is_completed,
        }));
        setTodos(apiTodos);
      } else {
        Alert.alert('오류', '할 일 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', 'API 호출 중 문제가 발생했습니다.');
    }
  };

  // 할 일 추가 함수
  const addTodo = () => {
    if (newTodoTitle.trim() === '') {
      Alert.alert('오류', '할 일을 입력해주세요.');
      return;
    }
    const newTodo = {
      id: (todos.length + 1).toString(),
      title: newTodoTitle,
      isChecked: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
    setIsTodoModalVisible(false);
  };

  // 할 일 체크 상태 토글
  const toggleCheck = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, isChecked: !todo.isChecked} : todo,
      ),
    );
  };

  // 할 일 삭제 함수
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    Alert.alert('삭제됨', '할 일이 삭제되었습니다.');
  };

  // 목록이 비어있을 때 표시
  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>할 일이 없습니다.</Text>
    </View>
  );

  // FlatList 아이템 렌더링
  const renderItem = ({item}: {item: any}) => (
    <>
      <View style={{paddingHorizontal: 15, padding: 5}}>
        <TodoItem
          title={item.title}
          isChecked={item.isChecked}
          onCheck={() => toggleCheck(item.id)}
          onDelete={() => deleteTodo(item.id)}
          onEdit={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>
    </>
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
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={
            todos.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}
          }
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsTodoModalVisible(true)}>
        <AntDesign name="plus" size={setWidth(20)} color={palette.white} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isTodoModalVisible}
        onRequestClose={() => setIsTodoModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>할 일 추가</Text>
            <TextInput
              style={styles.input}
              placeholder="할 일을 입력해주세요."
              value={newTodoTitle}
              onChangeText={setNewTodoTitle}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.modalButton} onPress={addTodo}>
                <Text style={styles.modalButtonText}>추가</Text>
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
    fontSize: fontSize(18),
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
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
    fontSize: fontSize(14),
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
    fontSize: fontSize(14),
    fontWeight: 'bold',
  },
});

export default TodoList;
