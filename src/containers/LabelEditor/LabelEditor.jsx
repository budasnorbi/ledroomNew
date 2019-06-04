/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

// Color picker
import ColorPicker from 'react-color-picker';
import 'react-color-picker/index.css';

// Style
import style from './style';

// Child components
import LabelTitle from '../../components/LabelTitle/LabelTitle';
import LabelTimePicker from '../../components/LabelTimePicker/LabelTimePicker';
import LabelEffectSelect from '../../components/LabelEffectSelect/LabelEffectSelect';
import LabelSave from '../../components/LabelSave/LabelSave';
import LedIndexPicker from '../LedIndexPicker/LedIndexPicker';

// Wrappers
import LabelWrapper from '../../components/LabelWrapper/LabelWrapper';

// eslint-disable-next-line react/prefer-stateless-function
class LabelEditor extends Component {
  render() {
    return (
      <div className="columns box" css={style.LabelEditorWrapper}>
        <div className="column is-two-thirds">
          <LedIndexPicker />
        </div>
        <div className="column" css={style.labelOptionWrapper}>
          <ColorPicker
            saturationWidth="90%"
            hueWidth="10%"
            hueMargin="0"
          />

          <LabelTitle />

          <LabelEffectSelect />

          <LabelWrapper>
            <LabelTimePicker placeholder="Start time" />
            <LabelTimePicker placeholder="End time" />
          </LabelWrapper>

          <LabelSave />
        </div>
      </div>
    );
  }
}

export default LabelEditor;
