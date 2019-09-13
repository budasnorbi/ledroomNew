
export default function UiReducer(
  state = {
    labelId: null,
    selectionId: null,
    left: null,
    top: null,
    colorIndex: null,
    colorPickerIsOpened: false,
    colorPickerInitColor: '#000000',
    maxLedCount: 806,
    activeLabel: null,
    time:0,
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
    };
  }

  case 'CLOSE_COLOR_PICKER': {
    return {
      ...state,
      colorPickerIsOpened: false,
    };
  }

  case 'OPEN_COLOR_PICKER': {
    return {
      ...state,
      colorPickerIsOpened: true,
    };
  }

  case 'SET_LABEL_ACTIVE': {
    return {
      ...state,
      activeLabel:payload.labelId,
    }
  }

  case 'SET_CURRENT_TIME': {
    return {
      ...state,
      time: payload.time,
    }
  }

  default:
    return state;
  }
}
