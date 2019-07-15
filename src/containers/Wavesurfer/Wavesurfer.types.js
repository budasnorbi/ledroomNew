import { bool, func } from 'prop-types';

const WavesurferTypes = {
  isPlaying: bool.isRequired,
  setDuration: func.isRequired,
};

export default WavesurferTypes;
