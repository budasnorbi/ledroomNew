export const mapStateToProps = ({ LabelStore, UiStore, ColorStore }, { selectionId }) => ({
  ...LabelStore.labels[UiStore.labelId].selectionList[selectionId],
  colorlist: ColorStore[`${UiStore.labelId}-${selectionId}`],
});

export const a = {};
