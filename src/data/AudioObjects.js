export default function AudioObjects() {
  class PremixedAudioElement {
    constructor(title, color, image) {
      this.title = title;
      this.color = color;
      this.image = image;
    }
  }

  const cafe = new PremixedAudioElement(
    'Cafe',
    'green',
    require('../assets/images/forest.png'),
  );

  const city = new PremixedAudioElement(
    'City',
    'grey',
    require('../assets/images/urban.png'),
  );

  const beach = new PremixedAudioElement(
    'Beach',
    'lightblue',
    require('../assets/images/space.png'),
  );

  const rainforest = new PremixedAudioElement(
    'Rainforest',
    'darkgreen',
    require('../assets/images/rainforest.png'),
  );

  premixedAudioList = [cafe, city, beach, rainforest];

  return { premixedAudioList };
}
