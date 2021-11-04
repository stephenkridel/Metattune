import React from 'react';
import AboutComponent from '../components/AboutComponent';

const AboutScreen1 = () => {
  return (
    <AboutComponent
      image={require('../assets/images/about1.png')}
      text="ATT stands for Attention Training Technique, an alternative to other forms of mindfulness training, like meditation."
      header="What is ATT?"
      prevScreen="About1"
      nextScreen="About2"
      shouldShowLeft={false}
      shouldShowRight={true}
    />
  );
};

const AboutScreen2 = () => {
  return (
    <AboutComponent
      image={require('../assets/images/about2.png')}
      text="ATT is a research-backed method that guides you to focus on sounds around you. An ATT session takes only 10-15 minutes."
      header="How does ATT work?"
      prevScreen="About1"
      nextScreen="About3"
      shouldShowLeft={true}
      shouldShowRight={true}
    />
  );
};

const AboutScreen3 = () => {
  return (
    <AboutComponent
      image={require('../assets/images/about3.png')}
      text="By improving your focus, you can improve productivity, reduce stress, and alleviate symptoms of anxiety and depression."
      header="How does ATT help?"
      prevScreen="About2"
      nextScreen="Selector"
      shouldShowLeft={true}
      shouldShowRight={false}
    />
  );
};

export { AboutScreen1, AboutScreen2, AboutScreen3 };
