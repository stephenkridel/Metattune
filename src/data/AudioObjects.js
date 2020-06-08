export default function AudioObjects() {
    const nature = {
        title: 'Nature',
        file: require("../assets/nature.mp3"),
        isPremixed: true
    }
    
    const urban = {
        title: 'Urban',
        file: require("../assets/nature.mp3"),
        isPremixed: true
    }

    return { nature, urban }
};