// Actions
import { updateSongPlaying } from '../../actions/actions';

export const mapStateToProp = ({ WaveformStore }) => ({
  isPlaying: WaveformStore.isPlaying,
});

export const mapDispatchToProp = {
  updateSongPlaying,
};
