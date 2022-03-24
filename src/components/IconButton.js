import React from 'react';
import { TouchableOpacity } from 'react-native';
import IconContainer from './IconContainer';
import { useNavigation } from '@react-navigation/native';

const IconButton = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Pdf', {
          source: props.source,
        })
      }>
      <IconContainer
        colors={props.colors}
        iconName={props.iconName}
        iconSize={props.iconSize}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
