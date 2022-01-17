import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const AvatarComponent = props => {
  return (
    <View style={[styles.AvatarContainer, { width: props.avatarWidth }]}>
      <Image
        source={
          props.AvatarObject.token == ''
            ? require('../assets/images/avatars/avatar-0.png')
            : props.AvatarObject.file
        }
        resizeMode={'contain'}
        style={styles.AvatarImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  AvatarContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 200,
    borderColor: 'lightgrey',
    borderWidth: 1,
    aspectRatio: 1,
  },
  AvatarImage: {
    height: '100%',
    aspectRatio: 1,
  },
});

export default AvatarComponent;
