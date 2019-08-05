
export default function ColorReducer(
  state = {},
  { payload, type },
) {
  switch (type) {
  case 'ADD_SELECTION': {
    const { labelId, selectionId } = payload;
    return {
      ...state,
      [`${labelId}-${selectionId}`]: [],
    };
  }

  case 'ADD_COLOR': {
    const { labelId, selectionId } = payload;
    return {
      ...state,
      [`${labelId}-${selectionId}`]: [
        ...state[`${labelId}-${selectionId}`],
        '#000000',
      ],
    };
  }

  case 'SET_COLOR': {
    const {
      labelId, selectionId, colorIndex, color,
    } = payload;

    const newColors = [...state[`${labelId}-${selectionId}`]];
    newColors[colorIndex] = color;

    return {
      ...state,
      [`${labelId}-${selectionId}`]: newColors,
    };
  }

  case 'DELETE_COLOR': {
    const {
      labelId, selectionId, colorIndex,
    } = payload;

    const newColors = [...state[`${labelId}-${selectionId}`]];
    newColors.splice(colorIndex, 1);

    return {
      ...state,
      [`${labelId}-${selectionId}`]: newColors,
    };
  }

  default:
    return state;
  }
}
