// eslint-disable-next-line import/prefer-default-export
export const updateSongPlaying = () => ({
  type: 'UPDATE_SONG_PLAYING',
});

export const addLabel = () => ({
  type: 'ADD_LABEL',
});

export const setDuration = payload => ({
  type: 'SET_DURATION',
  payload,
});

export const setSelectedLabelIndex = payload => ({
  type: 'SET_SELECTED_LABEL_INDEX',
  payload,
});
