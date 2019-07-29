/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
// import { connect } from 'react-redux';
import types from './WavesurferAddLabel.types';

// import { mapDispatchToProps } from './WavesurferAddLabel.redux';
// Style
import style from './WavesurferAddLabel.style';


const WavesurferAddLabel = ({
  addLabel,
}) => (
  <button
    type="button"
    className="button is-dark"
    css={style.marginLeft}
    onClick={addLabel}
  >
    <span className="icon is-small">
      <i className="ion-md-add" />
    </span>
  &nbsp;
  Add Label
  </button>
);

WavesurferAddLabel.propTypes = types;

export default WavesurferAddLabel;
