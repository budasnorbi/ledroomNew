export const mapStateToProps = ({ LabelStore }, { selectionId }) => ({
  ...LabelStore.labels[LabelStore.selectedLabelId].selectionList[selectionId],
  selectedLabelId: LabelStore.selectedLabelId,
});
