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
        require('../assets/nature.mp3'),
        'green',
        [
            require('../assets/audio1.mp3'),
            require('../assets/audio2.mp3'),
            require('../assets/audio3.mp3'),
            require('../assets/audio4.mp3'),
            require('../assets/audio5.mp3')
        ],
        require('../assets/forest.png')
    );

    const urban = new PremixedAudioElement(
        'Urban',
        require('../assets/urban.mp3'),
        'grey',
        [
            require('../assets/audio1.mp3'),
            require('../assets/audio2.mp3'),
            require('../assets/audio3.mp3'),
            require('../assets/audio4.mp3'),
            require('../assets/audio5.mp3')
        ],
        require('../assets/urban.png')
    );

    const space = new PremixedAudioElement(
        'Space',
        require('../assets/space.mp3'),
        'lightblue',
        [
            require('../assets/audio1.mp3'),
            require('../assets/audio2.mp3'),
            require('../assets/audio3.mp3'),
            require('../assets/audio4.mp3'),
            require('../assets/audio5.mp3')
        ],
        require('../assets/space.png')
    );

    const rainforest = new PremixedAudioElement(
        'Rainforest',
        require('../assets/rainforest.mp3'),
        'darkgreen',
        [
            require('../assets/audio1.mp3'),
            require('../assets/audio2.mp3'),
            require('../assets/audio3.mp3'),
            require('../assets/audio4.mp3'),
            require('../assets/audio5.mp3')
        ],
        require('../assets/forest.png')
    );

    premixedAudioList = [nature, urban, space, rainforest];

    return { premixedAudioList };
}
