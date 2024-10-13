import React from 'react';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import {InfoStyles} from './InfoModalStyles';

interface InfoModalProps {
  isTodoVisible: boolean;
  onTodoClose: () => void;
  children?: React.ReactNode;
}

export const TodoModal: React.FC<InfoModalProps> = ({
  isTodoVisible,
  onTodoClose,
  children,
}) => {
  return (
    <Modal
      visible={isTodoVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onTodoClose}>
      <TouchableWithoutFeedback onPress={onTodoClose}>
        <View style={InfoStyles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={InfoStyles.modalView}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TodoModal;
