import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconComponent from './IconComponent';
import { withNavigation } from 'react-navigation';

const IconComponentPressable = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Pdf', {
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

export default withNavigation(IconComponentPressable);
