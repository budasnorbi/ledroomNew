import {
  selectLabel, selectSelection, deleteLabel, addLabel,
} from '../../actions/actions';

export const mapStateToProps = ({
  WaveformStore, UiStore, LabelStore,
}) => ({
  isPlaying: WaveformStore.isPlaying,
  labelId: UiStore.labelId,
  labelIds: Object.keys(LabelStore.labels).map(num => parseInt(num)),
  selectionId: UiStore.selectionId,
  selectionIds: Object.keys((LabelStore.labels[UiStore.labelId] || {}).selectionList || {})
    .map(num => parseInt(num)),
  selectionRanges: Object.values((LabelStore.labels[UiStore.labelId] || {}).selectionList || {})
    .map(({ start, end }) => `${start} - ${end}`),
  colorPickerIsOpened: UiStore.colorPickerIsOpened,
  labelTitleList: Object.values(LabelStore.labels).map(label => `${label.startTime.toFixed(2)}s - ${label.endTime.toFixed(2)}s`),
  duration: LabelStore.duration,
});

export const mapDispatchToProps = {
  selectLabel,
  selectSelection,
  deleteLabel,
  addLabel,
};
