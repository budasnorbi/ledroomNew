/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

import { TimePicker } from 'antd';
import moment from 'moment';

// Style
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class RegionEditor extends Component {
  render() {
    return (
      <div css={style.margin} className="box">

        <div className="columns">

          <div className="column is-half">

            <div css={style.margin}>
              <label className="label">Region title</label>
              <input className="input" type="text" placeholder="Title of your label (optional)"/>
            </div>

            <div css={style.margin} className="is-flex">
              
              <div css={[style.flexGrow, style.rightMargin]}>
                <label className="label">Start time</label>
                <TimePicker
                  css={style.timePicker}
                  autoFocus
                  allowClear={false}
                  defaultValue={moment('00:00', 'mm:ss')}
                  format="mm:ss"
                  placeholder="Start time"
                  inputReadOnly
                />
              </div>

              <div css={[style.flexGrow, style.leftMargin]}>
                <label className="label">End time</label>
                <TimePicker
                  css={style.timePicker}
                  allowClear={false}
                  defaultValue={moment('00:00', 'mm:ss')}
                  format="mm:ss"
                  placeholder="Finish time"
                  inputReadOnly
                />
              </div>

            </div>

            <div css={style.margin} className="is-flex">

              <div css={[style.flexGrow, style.rightMargin]}>
                <label css={style.colorPickerTitle} className="label">From color</label>
                <button type="button" css={style.colorPickerButton}></button>
              </div>

              <div css={[style.flexGrow, style.rightMargin]}>
                <label css={style.colorPickerTitle} className="label">To color</label>
                <button type="button" css={style.colorPickerButton}></button>
              </div>

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

          <div className="column is-half">Second column</div>
        </div>
      </div>
    );
  }
}

export default RegionEditor;
