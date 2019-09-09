/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';

// Antd
import { TimePicker } from 'antd';

// moment
import moment from 'moment';

// PropTypes
import LabelTimePickerTypes from './LabelTimePicker.types';

// Style
import style from './style';

const LabelTimePicker = ({
  placeholder,
  handleTimePicked,
  value,
}) => (
  <div css={[style.flexGrow, style.timePickerMargin]}>
    <label className="label">
      { placeholder }
      <TimePicker
        css={style.timePicker}
        allowClear={false}
        defaultValue={moment('00:00', 'mm:ss')}
        format="mm:ss"
        placeholder={placeholder}
        inputReadOnly
        onChange={handleTimePicked}
        value={value}
      />
    </label>
  </div>
);

LabelTimePicker.propTypes = LabelTimePickerTypes;

export default LabelTimePicker;
