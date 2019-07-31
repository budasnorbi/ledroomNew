import { setColorPickerClose, setColor } from '../../actions/actions';

export const mapStateToProps = ({ ColorPickerStore }) => ({
  left: ColorPickerStore.left,
  top: ColorPickerStore.top,
  labelId: ColorPickerStore.labelId,
  selectionId: ColorPickerStore.selectionId,
  colorIndex: ColorPickerStore.colorIndex,
});

export const mapDispatchToProps = {
  setColorPickerClose,
  setColor,
};
