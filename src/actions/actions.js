// eslint-disable-next-line import/prefer-default-export
export const updateSongPlaying = () => ({
  type: 'UPDATE_SONG_PLAYING',
});

export const addLabel = payload => ({
  type: 'ADD_LABEL',
  payload,
});

export const deleteLabel = payload => ({
  type: 'DELETE_LABEL',
  payload,
});

export const setDuration = payload => ({
  type: 'SET_SONG_DURATION',
  payload,
});

export const setSelectedLabelIndex = payload => ({
  type: 'SET_SELECTED_LABEL_INDEX',
  payload,
});

export const initLabelRange = payload => ({
  type: 'INIT_LABEL_RANGE',
  payload,
});

export const setLabelDuration = payload => ({
  type: 'SET_LABEL_DURATION',
  payload,
});
