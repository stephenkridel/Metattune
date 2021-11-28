export default class User {
  constructor(name) {
    this.name = name;
    hoursCompleted = 0;
    sessionsCompleted = 0;
    favoriteSession = '';
    dayStreak = 0;
    selectedAvatar = '';
    lastListenTime = null;
    sessionTotals = [
      { title: 'Cafe', total: 0 },
      { title: 'City', total: 0 },
      { title: 'Beach', total: 0 },
      { title: 'Rainforest', total: 0 },
    ];
  }
}
