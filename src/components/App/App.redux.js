import { selectLabel, selectSelection } from '../../actions/actions';

export const mapStateToProps = ({
  WaveformStore, UiStore, LabelStore,
}) => ({
  isPlaying: WaveformStore.isPlaying,
  labelId: UiStore.labelId,
  labelIds: Object.keys(LabelStore.labels).map(num => parseInt(num)),
  selectionId: UiStore.selectionId,
  selectionIds: Object.keys((LabelStore.labels[UiStore.labelId] || {}).selectionList || {})
    .map(num => parseInt(num)),
  colorPickerIsOpened: UiStore.colorPickerIsOpened,
});

export const mapDispatchToProps = {
  selectLabel,
  selectSelection,
};
