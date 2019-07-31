export const mapStateToProps = ({ WaveformStore, LabelStore, ColorPickerStore }) => ({
  isPlaying: WaveformStore.isPlaying,
  id: LabelStore.selectedLabelId,
  colorPickerIsOpened: ColorPickerStore.isOpened,
});

export const mapDispatchToProps = {

};
