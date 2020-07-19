export default function AudioObjects() {
    class PremixedAudioElement {
        constructor(title, file, color, soundBites) {
            this.title = title;
            this.file = file;
            this.color = color;
            this.soundBites = soundBites;
        }
    }

    const nature = new PremixedAudioElement(
        'Nature',
        require('../assets/nature.mp3'),
        'green',
        ['audio1', 'audio2', 'audio3', 'audio4', 'audio5']
    );

    const urban = new PremixedAudioElement(
        'Urban',
        require('../assets/urban.mp3'),
        'grey',
        ['audio1', 'audio2', 'audio3', 'audio4', 'audio5']
    );

    const beach = new PremixedAudioElement(
        'Beach',
        require('../assets/beach.mp3'),
        'lightblue',
        ['audio1', 'audio2', 'audio3', 'audio4', 'audio5']
    );

    const rainforest = new PremixedAudioElement(
        'Rainforest',
        require('../assets/rainforest.mp3'),
        'darkgreen',
        ['audio1', 'audio2', 'audio3', 'audio4', 'audio5']
    );

    premixedAudioList = [nature, urban, beach, rainforest];

    return { premixedAudioList };
}
