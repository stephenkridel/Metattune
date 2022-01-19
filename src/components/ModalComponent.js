import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ModalComponent = props => {
  const shouldShowButton = props.shouldShowButton ? 'flex' : 'none';
  return (
    <Modal visible={props.isVisible} animationType="slide">
      <TouchableOpacity style={styles.XButton} onPress={props.onPressX}>
        <AntDesign name="close" size={35} color="rgb(255, 101, 132)" />
      </TouchableOpacity>
      <View style={styles.Modal}>
        <Text
          style={[
            { textAlign: props.shouldShowButton ? 'center' : 'left' },
            styles.ModalText,
          ]}>
          {props.message}
        </Text>
        <TouchableOpacity
          style={[styles.DeleteButton, { display: shouldShowButton }]}
          onPress={props.onPressDelete}>
          <Text style={styles.DeleteButtonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 27, 57)',
    width: '100%',
    height: '100%',
    padding: '5%',
  },
  ModalText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
    marginBottom: '10%',
    lineHeight: 40,
  },
  ModalClose: {
    marginTop: 30,
    marginRight: 30,
    alignSelf: 'flex-end',
  },
  DeleteButton: {
    width: '70%',
    height: 50,
    backgroundColor: 'rgb(255, 101, 132)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  DeleteButtonText: {
    color: 'white',
    fontSize: 22.5,
    fontFamily: 'JosefinSans-Regular',
  },
  XButton: {
    top: 30,
    right: 30,
    position: 'absolute',
    zIndex: 1,
  },
});

export default ModalComponent;
