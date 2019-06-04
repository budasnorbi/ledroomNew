/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import LabelFramePickerTypes from './LabelFramePicker.types';

// Style
// import style from './style';

const LabelFramePicker = () => (
  <button
    type="button"
    className="button is-info is-pulled-left"
  >
    <span className="icon is-small is-pulled-left">
      <i className="ion ion-md-create" />
    </span>
    &nbsp;
    Make a frame
  </button>
);

LabelFramePicker.propTypes = LabelFramePickerTypes;

export default LabelFramePicker;