// Actions
import {
  addSelection,
  deleteSelection,
  setLedStart,
  setLedEnd,
  addColor,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore }) => ({
  selectedLabelId: LabelStore.selectedLabelId,
  selectionIds: Object.keys(LabelStore.labels[LabelStore.selectedLabelId].selectionList),
});

export const mapDispatchToProps = {
  addSelection,
  deleteSelection,
  setLedStart,
  setLedEnd,
  addColor,
};
