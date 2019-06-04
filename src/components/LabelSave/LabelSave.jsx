/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import LabelSaveTypes from './LabelSave.types';

const LabelSave = () => (
  <button
    type="button"
    className="button is-success"
  >
        Save
        &nbsp;
    <span className="icon is-small is-pulled-right">
      <i className="ion ion-md-checkmark" />
    </span>
  </button>
);

LabelSave.propTypes = LabelSaveTypes;

export default LabelSave;
