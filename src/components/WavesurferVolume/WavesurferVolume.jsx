import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import { mapDispatchToProps } from './WavesurferVolume.redux';

// PropTypes
// import types from './WavesurferVolume.types';

// Style
import style from './WavesurferVolume.style';

// localUtil
// import util from './WavesurferVolume.util';

// globalUtil
// import gUtil from '../../util';

const WavesurferVolume = () => (
  <div css={style.container}>
    <span css={style.icon} className="icon">
      <i className="ion ion-md-volume-low" />
    </span>
    <Slider css={style.slider} defaultValue={30} />
  </div>
);

// WavesurferVolume.propTypes = types;

// export default WavesurferVolume;
export default connect(
  null,
  mapDispatchToProps,
)(WavesurferVolume);
