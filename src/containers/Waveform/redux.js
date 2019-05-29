// Actions
import { updateSongPlaying, addSongRegion } from '../../actions/actions';

export const mapStateToProp = ({ WaveformStore }) => ({
  isPlaying: WaveformStore.isPlaying,
  regions: WaveformStore.regions,
});

export const mapDispatchToProp = {
  updateSongPlaying,
  addSongRegion,
};
