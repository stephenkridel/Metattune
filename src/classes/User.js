export default class User {
  constructor(name) {
    this.name = name;
    this.hoursCompleted = 0;
    this.sessionsCompleted = 0;
    this.favoriteSession = '';
    this.dayStreak = 0;
    this.selectedAvatar = '';
    this.lastListenTime = null;
    this.sessionTotals = [
      { title: 'Cafe', total: 0 },
      { title: 'City', total: 0 },
      { title: 'Beach', total: 0 },
      { title: 'Rainforest', total: 0 },
    ];
  }
}
