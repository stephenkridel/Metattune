export default function AudioObjects() {
    
    class PremixedAudioElement {
        constructor(title, file) {
            this.title = title;
            this.file = file;
        }
    }

    const nature = new PremixedAudioElement(
        'Nature',
        require("../assets/nature.mp3"),
    )
    
    const urban = new PremixedAudioElement(
        'Urban',
        require("../assets/nature.mp3"),
    )

    return { nature, urban }
};