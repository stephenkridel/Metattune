import React from 'react';
import AboutComponent from '../components/AboutComponent';

const AboutScreen1 = () => {
	return (
		<AboutComponent
			image={require('../assets/about1.png')}
			text='ATT Stands for Attention Training Technique, an alternative to other forms of mindfulness training, like meditation.'
			header='What is ATT?'
			prevScreen='About1'
			nextScreen='About2'
			disableLeft={true}
			disableRight={false}
		/>
	);
};

const AboutScreen2 = () => {
	return (
		<AboutComponent
			image={require('../assets/about2.png')}
			text='ATT is a research-backed method that guides you to focus on sounds around you. An ATT session takes only 10-15 minutes.'
			header='How does ATT work?'
			prevScreen='About1'
			nextScreen='About3'
			disableLeft={false}
			disableRight={false}
		/>
	);
};

const AboutScreen3 = () => {
	return (
		<AboutComponent
			image={require('../assets/about3.png')}
			text='By improving your focus, you can improve productivity, reduce stress, and alleviate symptoms of anxiety and depression.'
			header='How does ATT help?'
			prevScreen='About2'
			nextScreen='Selector'
			disableLeft={false}
			disableRight={false}
		/>
	);
};

export { AboutScreen1, AboutScreen2, AboutScreen3 };