import React from 'react';
import TextInfoComponent from '../components/TextInfoComponent';

const ReleaseScreen = () => {
  return (
    <TextInfoComponent
      infoText={
        'Attune is produced by us, two brothers from Ohio. We believe in developing accessible tools to improve mental health. If you have the ability and would like to support the development and maintenance of Attune, please donate below :)'
      }
      image={require('../assets/images/brothers-image.png')}
      URL={'https://ko-fi.com/rocketcafe'}
      headerText={'About Us'}
      buttonText={'Support'}
    />
  );
};

export default ReleaseScreen;
