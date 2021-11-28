import React from 'react';
import TextInfoComponent from '../components/TextInfoComponent';

const AttributionScreen = () => {
  return (
    <TextInfoComponent
      infoText={
        "This app wouldn't have been possible without the help of the open source community, including Micah Lanier who created the Avatar Illustration System which we used for our avatars"
      }
      image={require('../assets/images/yoga-image.png')}
      URL={'https://www.figma.com/community/file/829741575478342595'}
      headerText={'Attribution'}
      buttonText={"See Micah's Work"}
    />
  );
};

export default AttributionScreen;
