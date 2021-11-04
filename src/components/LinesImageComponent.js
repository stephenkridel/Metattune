import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const topImage = require('../assets/images/lines-top.png');
const topRightImage = require('../assets/images/lines-top-right.png');
const rightImage = require('../assets/images/lines-right.png');
const leftImage = require('../assets/images/lines-left.png');

const LinesImageComponent = props => {
  if (props.imageLocation === 'top') {
    var imageLocation = topImage;
    var locationStyle = styles.TopStyle;
  } else if (props.imageLocation === 'top-right') {
    var imageLocation = topRightImage;
    var locationStyle = styles.TopRightStyle;
  } else if (props.imageLocation === 'right') {
    var imageLocation = rightImage;
    var locationStyle = styles.RightStyle;
  } else if (props.imageLocation === 'left') {
    var imageLocation = leftImage;
    var locationStyle = styles.LeftStyle;
  }
  return (
    <View style={locationStyle}>
      <Image
        style={styles.ImageStyle}
        source={imageLocation}
        resizeMode={'cover'}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  TopRightStyle: {
    position: 'absolute',
    height: '40%',
    width: '60%',
    top: 0,
    right: 0,
  },
  TopStyle: {
    position: 'absolute',
    height: '7%',
    aspectRatio: 9.75,
    top: 0,
    left: '5%',
  },
  RightStyle: {
    position: 'absolute',
    height: '60%',
    aspectRatio: 0.08,
    bottom: 0,
    right: 0,
  },
  LeftStyle: {
    position: 'absolute',
    height: '65%',
    aspectRatio: 0.0919,
    top: -110,
    left: 0,
  },
  ImageStyle: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

export default LinesImageComponent;
