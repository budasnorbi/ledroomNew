import { setColorPickerClose, setColor, deleteColor } from '../../actions/actions';

export const mapStateToProps = ({ ColorPickerStore }) => ({
  left: ColorPickerStore.left,
  top: ColorPickerStore.top,
  labelId: ColorPickerStore.labelId,
  selectionId: ColorPickerStore.selectionId,
  colorIndex: ColorPickerStore.colorIndex,
  initColor: ColorPickerStore.initColor,
});

export const mapDispatchToProps = {
  setColorPickerClose,
  setColor,
  deleteColor,
};
