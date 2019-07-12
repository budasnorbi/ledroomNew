
export default function WaveformReducer(
  state = {
    isPlaying: false,
  },
  { payload, type },
) {
  switch (type) {
  case 'UPDATE_SONG_PLAYING': {
    return {
      ...state,
      isPlaying: !state.isPlaying,
    };
  }

  default:
    return state;
  }
}
