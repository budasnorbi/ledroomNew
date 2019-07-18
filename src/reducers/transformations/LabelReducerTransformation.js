// eslint-disable-next-line import/prefer-default-export
export const addLabel = (duration) => {
  const id = 'new label';
  const label = {
    id,
    startTime: 0,
    endTime: duration,
    opacityCurvePath: 'M0, 100 L100, 0',
    pickedColors: [],
    startLedIndex: 0,
    endLedIndex: 811,
    hasRange: false,
  };


  /*
    Led Curve módok

    - Ha 1 színt választunk akkor az erősségét lehet meghatározni 0 - 100
    - Ha 2 színt választunk akkor a két szaqsaaín átmenetét lehet meghatározni
    - Ha 100 színt választunk akkor 100 szín átmenetét lehet meghatározni

    - Ledeket ki lehet választani range alapján
    - // Ledeket ki lehet választani egy meghatározott pattern alapján
  */

  return [id, label];
};
