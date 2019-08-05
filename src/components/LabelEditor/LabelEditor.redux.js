// Actions
import {
  addSelection,
  selectSelection,
  deleteSelection,
  setLedStart,
  setLedEnd,
  addColor,
  selectColor,
  addOpacityPath,
  addTransitionPath,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore }, { labelId }) => ({
  selectionIds: Object.keys(LabelStore.labels[labelId].selectionList),
});

export const mapDispatchToProps = {
  addSelection,
  selectSelection,
  deleteSelection,
  setLedStart,
  setLedEnd,
  addColor,
  selectColor,
  addOpacityPath,
  addTransitionPath,
};
