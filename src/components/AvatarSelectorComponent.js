import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  updateSelectedAvatar,
  updateShowAvatarModal,
} from '../actions/UserActions';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';
import store from '../store/Store';
import AvatarComponent from './AvatarComponent';

const AvatarSelectorComponent = props => {
  return (
    <TouchableOpacity
      style={styles.AvatarButton}
      disabled={props.isDisabled || false}
      onPress={async () => {
        let newData = await AsyncStorageAPI.getItem('userToken');
        newData.selectedAvatar = props.AvatarObject;
        await AsyncStorageAPI.saveItem('userToken', newData);
        store.dispatch(updateSelectedAvatar(props.AvatarObject));
        store.dispatch(updateShowAvatarModal(false));
      }}>
      <AvatarComponent AvatarObject={props.AvatarObject} avatarWidth={'100%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  AvatarButton: {
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    borderRadius: 200,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    aspectRatio: 1,
    width: '30%',
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default AvatarSelectorComponent;
