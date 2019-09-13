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
  openColorPicker,
  setLabelTitle,
} from '../../actions/actions';

export const mapStateToProps = ({ LabelStore, UiStore, ColorStore }) => ({
  labelId: UiStore.labelId,
  selectionId: UiStore.selectionId,
  opacityPath: (LabelStore.labels[UiStore.labelId]
    .selectionList[UiStore.selectionId] || {}).opacityPath || null,
  transitionPath: (LabelStore.labels[UiStore.labelId]
    .selectionList[UiStore.selectionId] || {}).transitionPath || null,
  colorList: ColorStore[`${UiStore.labelId}-${UiStore.selectionId}`] || [],
  startLedIndex: LabelStore.labels[UiStore.labelId].selectionList[UiStore.selectionId].start,
  endLedIndex: LabelStore.labels[UiStore.labelId].selectionList[UiStore.selectionId].end,
  maxLedCount: UiStore.maxLedCount,
  labelTitle: LabelStore.labels[UiStore.labelId].title,
  startTime: LabelStore.labels[UiStore.labelId].startTime,
  endTime: LabelStore.labels[UiStore.labelId].endTime,
  activeLabel: UiStore.activeLabel,
  currentTime: UiStore.time,
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
  openColorPicker,
  setLabelTitle,
};
