// Actions
import {
  setDuration, initLabelRange, setLabelDuration, addLabel, deleteLabel, selectLabel,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore }) => ({
  volume: LabelStore.volume,
  duration: LabelStore.duration,
});

export const mapDispatchToProps = {
  setDuration,
  initLabelRange,
  setLabelDuration,

  addLabel,
  selectLabel,
  deleteLabel,
};