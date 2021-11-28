import React from 'react';
import TextInfoComponent from '../components/TextInfoComponent';

const ReleaseScreen = () => {
  return (
    <TextInfoComponent
      infoText={
        'Metattune is produced by us, two brothers from Ohio. We believe in developing accessible tools to improve mental health. If you would like to support the maintenance of Metattune, please donate below :)'
      }
      image={require('../assets/images/brothers-image.png')}
      URL={'https://ko-fi.com/rocketcafe'}
      headerText={'About Us'}
      buttonText={'Support'}
    />
  );
};

export default ReleaseScreen;
