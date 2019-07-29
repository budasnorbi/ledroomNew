export const mapStateToProps = ({ WaveformStore, LabelStore, ColorPickerStore }) => ({
  isPlaying: WaveformStore.isPlaying,
  id: LabelStore.selectedLabelId,
  left: ColorPickerStore.left,
  top: ColorPickerStore.top,
});

export const mapDispatchToProps = {

};
