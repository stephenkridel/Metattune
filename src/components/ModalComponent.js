import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ModalComponent = props => {
  const shouldShowButton = props.shouldShowButton ? 'flex' : 'none';
  return (
    <Modal visible={props.isVisible} animationType="slide">
      <TouchableOpacity
        style={{ marginTop: 30, marginRight: 30, alignSelf: 'flex-end' }}
        onPress={props.onPressX}>
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
    margin: 20,
    justifyContent: 'center',
  },
  ModalText: {
    fontSize: 25,
    color: 'rgb(30, 27, 57)',
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
});

export default ModalComponent;
