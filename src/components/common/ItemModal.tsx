import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {ItemStyles} from './ItemModalStyles';

interface ItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: {
    item_name: string;
    item_rarity: string;
    image_description: string;
    image_url: string;
  };
  onConfirm: () => void;
  children?: React.ReactNode;
  buttonText: string;
}

const ItemModal: React.FC<ItemModalProps> = ({
  isVisible,
  onClose,
  item,
  onConfirm,
  children,
  buttonText,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={ItemStyles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={ItemStyles.modalView}>
              {/* 아이템 이미지 */}
              <Image
                source={
                  item.image_url && typeof item.image_url === 'string'
                    ? {uri: item.image_url} // 유효한 URL일 경우
                    : require('../../assets/newimages/doit_logo.png') // 기본 이미지
                }
                style={ItemStyles.itemImage}
                resizeMode="contain"
              />
              {/* 아이템 정보 박스 */}
              <View style={ItemStyles.infoBox}>
                <Text style={ItemStyles.itemName}>{item.item_name}</Text>
                {/* <Text style={ItemStyles.itemRarity}>{item.item_rarity}</Text> */}
                <Text style={ItemStyles.itemDescription}>
                  {'('}
                  {item.image_description}
                  {')'}
                </Text>
              </View>
              {/* 추가 콘텐츠 */}
              {children}
              {/* 버튼 */}
              <View style={ItemStyles.buttonContainer}>
                <TouchableOpacity
                  style={[ItemStyles.button, ItemStyles.cancelButton]}
                  onPress={onClose}>
                  <Text style={ItemStyles.buttonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[ItemStyles.button, ItemStyles.confirmButton]}
                  onPress={onConfirm}>
                  <Text style={ItemStyles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ItemModal;
