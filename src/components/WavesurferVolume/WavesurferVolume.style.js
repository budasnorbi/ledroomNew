// import styled from '@emotion/styled';
import { css } from '@emotion/core';

const WavesurferVolumeStyle = {
  container: css`
    display:flex;
    align-items:center;
    width: 200px;
  `,
  iconContainer: css`
    margin:0 10px;
  `,
  icon: css`
    font-size: 24px;
  `,
  slider: css`
    width: 100%;

    .ant-slider-handle{
      border: none;
    }

    .ant-slider-rail{
      background-color: rgba(255, 255, 255, .15);
    }

    &:hover .ant-slider-rail {
      background-color: rgba(255, 255, 255, .25);
    }

    .ant-slider-step{
      background-color: unset;
    }
  `,
};

export default WavesurferVolumeStyle;
