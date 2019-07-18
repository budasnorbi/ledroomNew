export const mapStateToProps = ({ WaveformStore, LabelStore }) => ({
  isPlaying: WaveformStore.isPlaying,
  ...LabelStore.labels[LabelStore.selectedLabelId],
});

export const mapDispatchToProps = {

};
