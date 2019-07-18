// Actions
import {
  setDuration, initLabelRange, setLabelDuration, addLabel, deleteLabel,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore }) => ({
  hasDefaultLabel: !!LabelStore.labels['new label'],
  duration: LabelStore.duration,
});

export const mapDispatchToProps = {
  setDuration,
  initLabelRange,
  setLabelDuration,
  addLabel,
  deleteLabel,
};
