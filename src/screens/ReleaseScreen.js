import React from 'react';
import TextInfoContainer from '../components/TextInfoContainer';

const ReleaseScreen = () => {
  return (
    <TextInfoContainer
      infoText={
        'This version is our first app store release! We are always working on fixing bugs and improving the app to give users the best experience. Tap on the button below to submit feedback!'
      }
      image={require('../assets/images/tech-image.png')}
      URL={'https://forms.gle/ZsWwqdkVyKuidjNB8'}
      headerText={'Release Version: 0.1.1'}
      buttonText={'Give Feedback'}
    />
  );
};

export default ReleaseScreen;
