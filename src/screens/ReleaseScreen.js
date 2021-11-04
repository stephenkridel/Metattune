import React from 'react';
import TextInfoComponent from '../components/TextInfoComponent';

const ReleaseScreen = () => {
  return (
    <TextInfoComponent
      infoText={
        "This release is one of the first beta releases, yay! It may have bugs. Okay, it'll have bugs. But we are working on fixing them and improving the app. Tap on the logo below to submit feedback!"
      }
      image={require('../assets/images/tech-image.png')}
      URL={'https://forms.gle/GjmXt3Z82NFvTBvc6'}
      headerText={'Release Version: 0.1.0'}
      buttonText={'Give Feedback'}
    />
  );
};

export default ReleaseScreen;
