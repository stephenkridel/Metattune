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

	const nature = new PremixedAudioElement(
		'Nature',
		require('../assets/sounds/nature.mp3'),
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

	const urban = new PremixedAudioElement(
		'Urban',
		require('../assets/sounds/urban.mp3'),
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

	const space = new PremixedAudioElement(
		'Space',
		require('../assets/sounds/space.mp3'),
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

	premixedAudioList = [nature, urban, space, rainforest];

	return { premixedAudioList };
}
