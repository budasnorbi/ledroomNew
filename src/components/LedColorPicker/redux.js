import { closeColorPicker, setColor, deleteColor, selectColor } from '../../actions/actions';

export const mapStateToProps = ({ UiStore }) => ({
  left: UiStore.left,
  top: UiStore.top,
  labelId: UiStore.labelId,
  selectionId: UiStore.selectionId,
  colorIndex: UiStore.colorIndex,
  colorPickerInitColor: UiStore.colorPickerInitColor,
});

export const mapDispatchToProps = {
  closeColorPicker,
  setColor,
  deleteColor,
  selectColor,
};
