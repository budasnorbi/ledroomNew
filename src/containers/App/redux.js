// Actions
import { updateSongPlaying } from '../../actions/actions';

export const mapStateToProps = ({ WaveformStore }) => ({
  isPlaying: WaveformStore.isPlaying,
  regions: WaveformStore.regions,
});

export const mapDispatchToProps = {
  updateSongPlaying,
};
