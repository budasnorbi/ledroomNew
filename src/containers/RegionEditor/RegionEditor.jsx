/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

// Color picker
// import ColorPicker from 'react-color-picker';
// import 'react-color-picker/index.css';

// Style
import style from './style';

// Child components
import LabelTitle from '../../components/LabelTitle/LabelTitle';
import LabelTimePicker from '../../components/LabelTimePicker/LabelTimePicker';
import LabelColorPicker from '../../components/LabelColorPicker/LabelColorPicker';
import LabelEffectSelect from '../../components/LabelEffectSelect/LabelEffectSelect';
import LabelSave from '../../components/LabelSave/LabelSave';
import LedIndexPicker from '../LedIndexPicker/LedIndexPicker';

// Wrappers
import LabelWrapper from '../../components/LabelWrapper/LabelWrapper';


// eslint-disable-next-line react/prefer-stateless-function
class RegionEditor extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-half">
          <div className="box">
            <LabelTitle />
            <LabelWrapper>
              <LabelTimePicker
                placeholder="Start time"
              />

              <LabelTimePicker
                placeholder="End time"
              />
            </LabelWrapper>

            <LabelWrapper />

            <LabelWrapper>
              <LabelColorPicker placeholder="From color" />
              <LabelColorPicker placeholder="To color" />
            </LabelWrapper>

            <LabelEffectSelect />
            <LabelWrapper>
              <LabelSave />
            </LabelWrapper>
          </div>
        </div>
        <div className="column is-half">
          <LedIndexPicker />
        </div>
      </div>
    );
  }
}

export default RegionEditor;
