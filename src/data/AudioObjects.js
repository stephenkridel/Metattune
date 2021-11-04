class PremixedAudioElement {
  constructor(title, color, image, duration, time, soundBites) {
    this.title = title;
    this.color = color;
    this.image = image;
    this.duration = duration;
    this.time = time;
    this.soundBites = soundBites;
  }
}

const intro = new PremixedAudioElement(
  'Intro',
  ['rgb(30, 27, 57)', 'rgb(30, 27, 57)'],
  require('../assets/images/intro.png'),
  45000,
  '1 min',
  null,
);

const cafe = new PremixedAudioElement(
  'Cafe',
  ['rgb(111, 98, 255)', 'rgb(111, 98, 255)'],
  require('../assets/images/cafe.png'),
  670000,
  '10 min',
  ['Espresso', 'Dishes', 'People', 'Left', 'Right', 'Behind', 'Music'],
);

const city = new PremixedAudioElement(
  'City',
  ['rgb(30, 27, 57)', 'rgb(30, 27, 57)'],
  require('../assets/images/city.png'),
  670000,
  '10 min',
  ['Cars', 'Construction', 'People', 'Sirens', 'Left', 'Right', 'Behind'],
);

const beach = new PremixedAudioElement(
  'Beach',
  ['rgb(255, 196, 208)', 'rgb(255, 196, 208)'],
  //['rgb(142, 90, 255)', 'rgb(111, 98, 255)'],
  require('../assets/images/beach.png'),
  670000,
  '10 min',
  ['Seagulls', 'Ocean', 'Boats', 'Sand', 'Water', 'Left', 'Right', 'Behind'],
);

const rainforest = new PremixedAudioElement(
  'Rainforest',
  ['rgb(255, 101, 132)', 'rgb(255, 101, 132)'],
  require('../assets/images/rainforest.png'),
  670000,
  '10 min',
  ['Birds', 'Insects', 'Thunder', 'Frogs', 'Left', 'Right', 'Behind'],
);

AudioObjects = [intro, cafe, beach, rainforest, city];

export default AudioObjects;
