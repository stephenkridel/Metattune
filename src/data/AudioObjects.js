export default function AudioObjects() {
    
    class PremixedAudioElement {
        constructor(title, file, color) {
            this.title = title;
            this.file = file;
            this.color = color;
        }
    }

    const nature = new PremixedAudioElement(
        'Nature',
        require("../assets/nature.mp3"),
        'green'
    )

    const urban = new PremixedAudioElement(
        'Urban',
        require("../assets/nature.mp3"),
        'grey'
    )

    const beach = new PremixedAudioElement(
        'Beach',
        require("../assets/nature.mp3"),
        'lightblue'
    )

    const rainforest = new PremixedAudioElement(
        'Rainforest',
        require("../assets/nature.mp3"),
        'darkgreen'
    )

    premixedAudioList = [nature, urban, beach, rainforest];

    return { premixedAudioList }
};