/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

// Color picker
import ColorPicker from 'react-color-picker';
import 'react-color-picker/index.css';

import { Select } from 'antd';

// Style
import style from './style';

// Child components
import LabelTitle from '../../components/LabelTitle/LabelTitle';
import LabelTimePicker from '../../components/LabelTimePicker/LabelTimePicker';
import LabelLedIndex from '../../components/LabelLedIndex/LabelLedIndex';

const { Option } = Select;

// eslint-disable-next-line react/prefer-stateless-function
class RegionEditor extends Component {
  render() {
    return (
      <div css={style.margin} className="box">

        <div className="columns">

          <div className="column is-half">

            <LabelTitle />

            <div css={style.margin} className="is-flex">

              <LabelTimePicker
                placeholder="Start time"
              />

              <LabelTimePicker
                placeholder="End time"
              />

            </div>

            <div css={style.margin} className="is-flex">
              <LabelLedIndex type="start" />
              <LabelLedIndex type="end" />
            </div>

            <div css={style.margin} className="is-flex">

              <div css={[style.flexGrow, style.rightMargin]}>
                <label css={style.colorPickerTitle} className="label">From color</label>
                <button type="button" css={style.colorPickerButton} />
              </div>

              <div css={[style.flexGrow, style.rightMargin]}>
                <label css={style.colorPickerTitle} className="label">To color</label>
                <button type="button" css={style.colorPickerButton} />
              </div>

            </div>

            <div css={style.margin}>
              <label className="label">Choose effect</label>
              <Select css={style.effectSelectInput}>
                <Option value="Fade">Fade</Option>
              </Select>
            </div>

            <button
              type="button"
              className="button is-success is-pulled-right"
            >
              Save
              &nbsp;
              <span className="icon is-small is-pulled-right">
                <i className="ion ion-md-checkmark" />
              </span>
            </button>

          </div>

          <div className="column is-half">
            <ColorPicker defaultValue="#452135" css={style.colorPicker} />
          </div>
        </div>
      </div>
    );
  }
}

export default RegionEditor;
