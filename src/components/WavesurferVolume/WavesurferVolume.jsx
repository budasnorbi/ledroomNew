import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import { mapDispatchToProps } from './WavesurferVolume.redux';

// PropTypes
import types from './WavesurferVolume.types';

// Style
import style from './WavesurferVolume.style';

// localUtil
// import util from './WavesurferVolume.util';

// globalUtil
// import gUtil from '../../util';

const WavesurferVolume = ({
  updateVolume,
}) => (
  <div css={style.container}>
    <span css={style.iconContainer} className="icon">
      <i css={style.icon} className="ion ion-md-volume-low" />
    </span>
    <Slider
      css={style.slider}
      min={0}
      max={1}
      step={0.01}
      defaultValue={0.5}
      included={false}
      onChange={updateVolume}
      tipFormatter={value => `${(value * 100).toFixed(0)}%`}
    />
  </div>
);

WavesurferVolume.propTypes = types;

// export default WavesurferVolume;
export default connect(
  null,
  mapDispatchToProps,
)(WavesurferVolume);
