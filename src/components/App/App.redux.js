export const mapStateToProps = ({
  WaveformStore, UiStore, LabelStore,
}) => ({
  isPlaying: WaveformStore.isPlaying,
  labelId: UiStore.labelId,
  labelsId: Object.keys(LabelStore.labels),
  selectionIds: Object.keys((LabelStore.labels[UiStore.labelId] || {}).selectionList || {}),
  colorPickerIsOpened: UiStore.colorPickerIsOpened,
});

export const mapDispatchToProps = {

};
