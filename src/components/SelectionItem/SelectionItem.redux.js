export const mapStateToProps = ({ LabelStore }, { id }) => ({
  ...LabelStore.labels[LabelStore.selectedLabelId].selectionList[id],
});
