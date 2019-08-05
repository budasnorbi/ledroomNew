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
  setTransitionPath,
  setOpacityPath,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore, UiStore }, { labelId }) => ({
  selectionId: UiStore.selectionId,
  selectionIds: Object.keys(LabelStore.labels[labelId].selectionList),
  opacityPath: (LabelStore.labels[UiStore.labelId]
    .selectionList[UiStore.selectionId] || {}).opacityPath || null,
  transitionPath: (LabelStore.labels[UiStore.labelId]
    .selectionList[UiStore.selectionId] || {}).transitionPath || null,
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
  setTransitionPath,
  setOpacityPath,
};
