export default function AudioObjects() {
	class PremixedAudioElement {
		constructor(title, file, color, soundBites, image) {
			this.title = title;
			this.file = file;
			this.color = color;
			this.soundBites = soundBites;
			this.image = image;
		}
	}

	const cafe = new PremixedAudioElement(
		'Cafe',
		require('../assets/sounds/cafe.mp3'),
		'green',
		[
			require('../assets/sounds/audio1.mp3'),
			require('../assets/sounds/audio2.mp3'),
			require('../assets/sounds/audio3.mp3'),
			require('../assets/sounds/audio4.mp3'),
			require('../assets/sounds/audio5.mp3')
		],
		require('../assets/images/forest.png')
	);

	const city = new PremixedAudioElement(
		'City',
		require('../assets/sounds/city.mp3'),
		'grey',
		[
			require('../assets/sounds/audio1.mp3'),
			require('../assets/sounds/audio2.mp3'),
			require('../assets/sounds/audio3.mp3'),
			require('../assets/sounds/audio4.mp3'),
			require('../assets/sounds/audio5.mp3')
		],
		require('../assets/images/urban.png')
	);

	const beach = new PremixedAudioElement(
		'Beach',
		require('../assets/sounds/beach.mp3'),
		'lightblue',
		[
			require('../assets/sounds/audio1.mp3'),
			require('../assets/sounds/audio2.mp3'),
			require('../assets/sounds/audio3.mp3'),
			require('../assets/sounds/audio4.mp3'),
			require('../assets/sounds/audio5.mp3')
		],
		require('../assets/images/space.png')
	);

	const rainforest = new PremixedAudioElement(
		'Rainforest',
		require('../assets/sounds/rainforest.mp3'),
		'darkgreen',
		[
			require('../assets/sounds/audio1.mp3'),
			require('../assets/sounds/audio2.mp3'),
			require('../assets/sounds/audio3.mp3'),
			require('../assets/sounds/audio4.mp3'),
			require('../assets/sounds/audio5.mp3')
		],
		require('../assets/images/rainforest.png')
	);

	premixedAudioList = [cafe, city, beach, rainforest];

	return { premixedAudioList };
}
