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
      <View style={styles.Modal}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.ModalText}>Choose Your Avatar</Text>
          }
          horizontal={false}
          numColumns={3}
          data={AvatarList}
          keyExtractor={item => item.token}
          renderItem={({ item }) => {
            return <AvatarSelectorComponent AvatarObject={item} />;
          }}
        />
      </View>
      <View style={styles.Buttons}>
        <TouchableOpacity
          onPress={() => store.dispatch(updateShowWarning(true))}>
          <FontAwesome name="trash-o" size={40} color='"rgb(255, 101, 132)"' />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPressX}>
          <AntDesign name="close" size={35} color="white" />
        </TouchableOpacity>
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
    alignSelf: 'center',
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Bold',
    marginVertical: '5%',
    lineHeight: 40,
  },
  Buttons: {
    paddingVertical: '3%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'rgb(30, 27, 57)',
  },
});

export default AvatarModalComponent;
