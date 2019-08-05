
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
        ...[`${labelId}-${selectionId}`],
        '#000000',
      ],
    };
  }

  default:
    return state;
  }
}
