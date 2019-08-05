
export default function ColorPickerReducer(
  state = {
    left: null,
    top: null,
    initColor: null,
  },
  { payload, type },
) {
  switch (type) {
  /* case 'SET_COLOR_PICKER_POSITION': {
    const { left, top } = payload;
    return {
      ...state,
      left,
      top,
      isOpened: true,
    };
  } */

  /* case 'SET_COLOR_PICKER_CLOSE': {
    return {
      ...state,
      isOpened: false,
    };
  } */

  /* case 'ADD_COLOR': {
    const {
      labelId, selectionId, colorIndex, initColor,
    } = payload;
    return {
      ...state,
      labelId,
      selectionId,
      colorIndex: colorIndex - 1,
      initColor,
    };
  } */

  /* case 'SELECT_COLOR': {
    const {
      labelId, selectionId, colorIndex, initColor,
    } = payload;
    return {
      ...state,
      labelId,
      selectionId,
      colorIndex,
      initColor,
    };
  } */

  case 'DELETE_COLOR': {
    const { isOpened } = payload;

    return {
      ...state,
      isOpened,
    };
  }

  default:
    return state;
  }
}
