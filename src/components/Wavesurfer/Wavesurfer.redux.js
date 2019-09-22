// Actions
import {
  setDuration,
  initLabelRange,
  setLabelDuration,
  addLabel,
  deleteLabel,
  selectLabel,
  selectSelection,
  setLabelActive,
  updateSongPlaying,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore, UiStore }) => ({
  volume: LabelStore.volume,
  duration: LabelStore.duration,
  activeLabel: UiStore.activeLabel,
});

export const mapDispatchToProps = {
  setDuration,
  initLabelRange,
  setLabelDuration,

  addLabel,
  selectLabel,
  deleteLabel,
  setLabelActive,

  selectSelection,
  updateSongPlaying,
};
