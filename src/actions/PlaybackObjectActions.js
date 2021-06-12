export const updateDidJustFinish = payload => ({
  type: 'playbackObject/statusDidJustFinish',
  payload: payload,
});

export const updateIsPlaying = payload => ({
  type: 'playbackObject/isPlaying',
  payload: payload,
});

export const updateHasLoaded = payload => ({
  type: 'playbackObject/hasLoaded',
  payload: payload,
});

export const updateBtnIcon = payload => ({
  type: 'playbackObject/btnIcon',
  payload: payload,
});

export const updateHasStarted = payload => ({
  type: 'playbackObject/hasStarted',
  payload: payload,
});

export const updateTimeListened = () => ({
  type: 'playbackObject/timeListened',
  payload: payload,
});

export const updatePlaybackObjectList = () => ({
  type: 'playbackObject/playbackObjectList',
  payload: payload,
});

export const resetPlaybackObjectList = () => ({
  type: 'playbackObject/resetPlaybackObjectList',
});

export const resetPlaybackObject = () => ({
  type: 'playbackObject/reset',
});
