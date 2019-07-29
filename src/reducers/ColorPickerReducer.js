
export default function ColorPickerReducer(
  state = {
    left: null,
    top: null,
  },
  { payload, type },
) {
  switch (type) {
  case 'SET_COLOR_PICKER_POSITION': {
    const { left, top } = payload;
    return {
      left, top,
    };
  }
  default:
    return state;
  }
}
