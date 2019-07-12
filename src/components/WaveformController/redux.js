// Actions
import { updateSongPlaying, addLabel } from '../../actions/actions';

export const mapStateToProps = ({ WaveformStore }) => ({
  isPlaying: WaveformStore.isPlaying,
});

export const mapDispatchToProps = {
  updateSongPlaying,
  addLabel,
};
