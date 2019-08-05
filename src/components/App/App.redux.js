export const mapStateToProps = ({
  WaveformStore, UiStore,
}) => ({
  isPlaying: WaveformStore.isPlaying,
  labelId: UiStore.labelId,
  colorPickerIsOpened: UiStore.colorPickerIsOpened,
});

export const mapDispatchToProps = {

};
