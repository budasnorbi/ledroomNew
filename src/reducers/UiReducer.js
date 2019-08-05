
export default function UiReducer(
  state = {
    labelId: null,
    selectionId: null,
    left: null,
    top: null,
    colorIndex: null,
    colorPickerIsOpened: false,
    colorPickerInitColor: '#000000',
  },
  { payload, type },
) {
  switch (type) {
  case 'SELECT_LABEL': {
    const { labelId } = payload;

    return {
      ...state,
      labelId,
    };
  }

  case 'SELECT_COLOR': {
    return {
      ...state,
      colorIndex: payload.colorIndex,
      colorPickerInitColor: payload.colorPickerInitColor,
    };
  }

  case 'SELECT_SELECTION': {
    const { selectionId } = payload;
    return {
      ...state,
      selectionId,
    };
  }

  case 'MOVE_COLOR_PICKER': {
    const { left, top } = payload;
    return {
      ...state,
      left,
      top,
      colorPickerIsOpened: true,
    };
  }

  case 'CLOSE_COLOR_PICKER': {
    return {
      ...state,
      colorPickerIsOpened: false,
    };
  }

  default:
    return state;
  }
}
