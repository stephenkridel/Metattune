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

export const updateShowWarning = payload => ({
  type: 'user/showWarning',
  payload: payload,
});
