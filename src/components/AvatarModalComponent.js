import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import store from '../store/Store';
import { updateShowWarning } from '../actions/UserActions';
import AvatarList from '../data/Avatars';
import AvatarSelectorComponent from './AvatarSelectorComponent';

const AvatarModalComponent = props => {
  return (
    <Modal visible={props.isVisible} animationType="slide">
      <TouchableOpacity
        style={styles.TrashButton}
        onPress={() => store.dispatch(updateShowWarning(true))}>
        <FontAwesome name="trash-o" size={40} color="rgb(255, 101, 132)" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 30, marginRight: 30, alignSelf: 'flex-end' }}
        onPress={props.onPressX}>
        <AntDesign name="close" size={35} color="rgb(255, 101, 132)" />
      </TouchableOpacity>
      <View style={styles.Modal}>
        <Text style={styles.ModalText}>Choose Your Avatar</Text>
        <FlatList
          horizontal={false}
          numColumns={3}
          data={AvatarList}
          keyExtractor={item => item.token}
          renderItem={({ item }) => {
            return <AvatarSelectorComponent AvatarObject={item} />;
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalText: {
    fontSize: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    marginVertical: '5%',
    lineHeight: 40,
  },
  ModalClose: {
    marginTop: 30,
    marginRight: 30,
    alignSelf: 'flex-end',
  },
  TrashButton: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
});

export default AvatarModalComponent;
