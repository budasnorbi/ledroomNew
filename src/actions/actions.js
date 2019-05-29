// eslint-disable-next-line import/prefer-default-export
export const updateSongPlaying = () => ({
  type: 'UPDATE_SONG_PLAYING',
});

export const addSongRegion = payload => ({
  type: 'ADD_SONG_REGION',
  payload,
});
