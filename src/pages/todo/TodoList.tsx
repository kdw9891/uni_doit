import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import {setWidth, setHeight} from '../../common/deviceUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InfoModal from '../../components/common/InfoModal';

const TodoList: React.FC<ScreenProps> = ({navigation}) => {
  // InfoModal 상태
  const {isVisible, openModal, closeModal} = useModal();

  // 할 일 추가 모달 상태
  const [isTodoModalVisible, setIsTodoModalVisible] = useState<boolean>(false);

  // 할 일 추가 관련 상태
  const [todos, setTodos] = useState<Array<{id: string; title: string}>>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  // 할 일 추가 함수
  const addTodo = () => {
    if (newTodoTitle.trim() === '') {
      Alert.alert('오류', '할 일을 입력해주세요.');
      return;
    }
    const newTodo = {id: (todos.length + 1).toString(), title: newTodoTitle};
    setTodos([...todos, newTodo]);
    setNewTodoTitle(''); // 입력 필드 초기화
    setIsTodoModalVisible(false); // 모달 닫기
    Alert.alert('할 일 추가됨', `새로운 할 일: ${newTodo.title}`);
  };

  // 할 일 목록이 없을 때 표시
  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>할 일이 없습니다.</Text>
    </View>
  );

  // 할 일 목록 렌더링
  const renderItem = ({item}: {item: {id: string; title: string}}) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={{flex: 10}}>
      <View style={{flex: 1}}>
        <Header
          centerIconProps={{
            iconName: 'null',
            iconType: 'AntDesign',
            imagePath: require('../../assets/newimages/todohead.png'),
            size: setWidth(45),
          }}
          rightIconProps={{
            iconType: 'FontAwesome',
            iconName: 'info',
            color: palette.gray[800],
            size: setWidth(30),
            onPress: openModal,
          }}
        />

        {/* InfoModal - TodoList 정보 표시 */}
        <InfoModal isVisible={isVisible} onClose={closeModal}>
          <Text>{'랭크 정보'}</Text>
        </InfoModal>
      </View>

      <View style={{flex: 9, paddingHorizontal: 20}}>
        {/* 할 일 목록 */}
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

      {/* 할 일 추가 버튼 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsTodoModalVisible(true)}>
        <FontAwesome name="plus" size={setWidth(25)} color={palette.white} />
      </TouchableOpacity>

      {/* 할 일 추가 모달 */}
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 15,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  todoText: {
    fontSize: 18,
    color: palette.gray[900],
  },
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
    width: setWidth(50),
    height: setHeight(50),
    backgroundColor: palette.blue[500],
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
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
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
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
    width: '100%',
    backgroundColor: palette.blue[600],
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: palette.gray[300],
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TodoList;
