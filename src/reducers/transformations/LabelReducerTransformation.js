// eslint-disable-next-line import/prefer-default-export
export const addLabel = ({ duration, labels }) => {
  const newLabel = {};
  newLabel.title = 'label name';
  newLabel.startTime = 0;
  newLabel.endTime = duration;
  newLabel.opacityCurvePath = 'M0, 100 L100, 0';
  newLabel.transitionCurvePath = 'M0, 100 L100, 0';
  newLabel.pickedColors = [];
  newLabel.startLedIndex = 0;
  newLabel.endLedIndex = 811;
  /*
    Led Curve módok

    - Ha 1 színt választunk akkor az erősségét lehet meghatározni 0 - 100
    - Ha 2 színt választunk akkor a két szaqsaaín átmenetét lehet meghatározni
    - Ha 100 színt választunk akkor 100 szín átmenetét lehet meghatározni

    - Ledeket ki lehet választani range alapján
    - // Ledeket ki lehet választani egy meghatározott pattern alapján

  */

  return [...labels, newLabel];
};
