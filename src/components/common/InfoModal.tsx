import React from 'react';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import {InfoStyles} from './InfoModalStyles';

interface InfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={InfoStyles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={InfoStyles.modalView}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InfoModal;
