export const updateUserName = payload => ({
  type: 'user/userName',
  payload: payload,
});

export const updateHoursCompleted = payload => ({
  type: 'user/hoursCompleted',
  payload: payload,
});

export const updateSessionsCompleted = payload => ({
  type: 'user/sessionsCompleted',
  payload: payload,
});

export const updateFavoriteSession = payload => ({
  type: 'user/favoriteSession',
  payload: payload,
});

export const updateDayStreak = payload => ({
  type: 'user/dayStreak',
  payload: payload,
});

export const updateSelectedAvatar = payload => ({
  type: 'user/selectedAvatar',
  payload: payload,
});

export const updateShowWarning = payload => ({
  type: 'user/showWarning',
  payload: payload,
});

export const updateShowAvatarModal = payload => ({
  type: 'user/showAvatarModal',
  payload: payload,
});

export const updateResetUser = payload => ({
  type: 'user/resetUser',
  payload: payload,
});
