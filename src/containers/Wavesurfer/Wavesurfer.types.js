import { bool, func, number } from 'prop-types';

const WavesurferTypes = {
  isPlaying: bool.isRequired,
  setDuration: func.isRequired,
  hasDefaultLabel: bool.isRequired,
  duration: number.isRequired,
};

export default WavesurferTypes;
