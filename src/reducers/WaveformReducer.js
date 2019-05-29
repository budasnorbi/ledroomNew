export default function Waveform(
  state = {
    isPlaying: false,
  },
  action,
) {
  switch (action.type) {
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
