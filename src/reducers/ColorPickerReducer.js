
export default function ColorPickerReducer(
  state = {
    left: null,
    top: null,
    isOpened: false,
    labelId: null,
    selectionId: null,
    colorIndex: null,
  },
  { payload, type },
) {
  switch (type) {
  case 'SET_COLOR_PICKER_POSITION': {
    const { left, top } = payload;
    return {
      ...state,
      left,
      top,
      isOpened: true,
    };
  }

  case 'SET_COLOR_PICKER_CLOSE': {
    return {
      ...state,
      isOpened: false,
    };
  }

  case 'ADD_COLOR': {
    const { labelId, selectionId, colorIndex } = payload;
    return {
      ...state,
      labelId,
      selectionId,
      colorIndex: colorIndex - 1,
    };
  }

  default:
    return state;
  }
}
