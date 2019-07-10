/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

// Style
import style from './style';

// Child components
// import LabelTitle from '../../components/LabelTitle/LabelTitle';
// import LabelTimePicker from '../../components/LabelTimePicker/LabelTimePicker';
// import LabelEffectSelect from '../../components/LabelEffectSelect/LabelEffectSelect';
import LabelSave from '../../components/LabelSave/LabelSave';
import LedIndexPicker from '../LedIndexPicker/LedIndexPicker';
import LedColorPicker from '../LedColorPicker/LedColorPicker';

import LabelCurve from '../LabelCurve/LabelCurve';

// Wrappers
// import LabelWrapper from '../../components/LabelWrapper/LabelWrapper';

// eslint-disable-next-line react/prefer-stateless-function
class LabelEditor extends Component {
  render() {
    return (
      <div className="columns box" css={style.LabelEditorWrapper}>
        <div className="column is-two-thirds">
          <LedIndexPicker />
          <LabelCurve />
        </div>
        <div id="asd" className="column" css={style.labelOptionWrapper}>
          <LedColorPicker />
          {/* <LabelTitle />

          <LabelEffectSelect />

          <LabelWrapper>
            <LabelTimePicker placeholder="Start time" />
            <LabelTimePicker placeholder="End time" />
          </LabelWrapper> */}

          <LabelSave />
        </div>
      </div>
    );
  }
}

export default LabelEditor;
