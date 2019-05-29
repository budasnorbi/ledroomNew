import { addRegion } from './transformations/WaveformTransformations';

export default function Waveform(
  state = {
    isPlaying: false,
    regions: [],
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

  case 'ADD_SONG_REGION': {
    return {
      ...state,
      regions: addRegion(state.regions, payload),
    };
  }

  default:
    return state;
  }
}
