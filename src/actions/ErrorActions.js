export const updateIsError = payload => ({
  type: 'error/isError',
  payload: payload,
});

export const updateErrorMsg = payload => ({
  type: 'error/errorMsg',
  payload: payload,
});
