import { bool, func } from 'prop-types';

const WaveformControllerTypes = {
  isPlaying: bool.isRequired,
  updateSongPlaying: func.isRequired,
};

export default WaveformControllerTypes;
