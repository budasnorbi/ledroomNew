import { func, bool } from 'prop-types';

const WavesurferPlayPauseTypes = {
  updateSongPlaying: func.isRequired,
  isPlaying: bool.isRequired,
  playPause: func.isRequired,
};

export default WavesurferPlayPauseTypes;
