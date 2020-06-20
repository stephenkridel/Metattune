export default function AudioObjects() {
    class AudioElement {
        constructor(title, file, color) {
            this.title = title;
            this.file = file;
            this.color = color;
        }
    }

    const nature = new AudioElement(
        'Nature',
        require('../assets/nature.mp3'),
        'green'
    );

    const urban = new AudioElement(
        'Urban',
        require('../assets/urban.mp3'),
        'grey'
    );

    const beach = new AudioElement(
        'Beach',
        require('../assets/beach.mp3'),
        'lightblue'
    );

    const rainforest = new AudioElement(
        'Rainforest',
        require('../assets/rainforest.mp3'),
        'darkgreen'
    );

    const campingout = new AudioElement(
        'Camping Out',
        require('../assets/campingout.mp3'),
        null
    );

    const forestbrook = new AudioElement(
        'Forest Brook',
        require('../assets/forestbrook.mp3'),
        null
    );

    const showers = new AudioElement(
        'Showers',
        require('../assets/showers.mp3'),
        null
    );

    premixedAudioList = [nature, urban, beach, rainforest];

    singleAudioList = [campingout, forestbrook, showers, beach, rainforest];

    return { premixedAudioList, singleAudioList };
}
