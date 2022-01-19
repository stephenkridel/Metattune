import React from 'react';
import { TouchableOpacity } from 'react-native';
import IconComponent from './IconComponent';
import { useNavigation } from '@react-navigation/native';

const IconComponentPressable = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Pdf', {
          source: props.source,
        })
      }>
      <IconComponent
        colors={props.colors}
        iconName={props.iconName}
        iconSize={props.iconSize}
      />
    </TouchableOpacity>
  );
};

export default IconComponentPressable;
