// Actions
import { updateSongPlaying } from '../../actions/actions';

export const mapStateToProps = ({ WaveformStore }) => ({
  isPlaying: WaveformStore.isPlaying,
});

export const mapDispatchToProps = {
  updateSongPlaying,
};
