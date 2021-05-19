export default function AudioObjects() {
  class PremixedAudioElement {
    constructor(title, color, image, soundBites) {
      this.title = title;
      this.color = color;
      this.image = image;
      this.soundBites = soundBites;
    }
  }

  const cafe = new PremixedAudioElement(
    'Cafe',
    'green',
    require('../assets/images/forest.png'),
    ['Espresso', 'Dishes', 'People', 'Left', 'Right', 'Behind'],
  );

  const city = new PremixedAudioElement(
    'City',
    'grey',
    require('../assets/images/urban.png'),
    ['Cars', 'Construction', 'People', 'Sirens', 'Left', 'Right', 'Behind'],
  );

  const beach = new PremixedAudioElement(
    'Beach',
    'lightblue',
    require('../assets/images/space.png'),
    ['Seagulls', 'Ocean', 'Boats', 'Sand', 'Water', 'Left', 'Right', 'Behind'],
  );

  const rainforest = new PremixedAudioElement(
    'Rainforest',
    'darkgreen',
    require('../assets/images/rainforest.png'),
    ['Birds', 'Insects', 'Thunder', 'Frogs', 'Left', 'Right', 'Behind'],
  );

  premixedAudioList = [cafe, city, beach, rainforest];

  return { premixedAudioList };
}
