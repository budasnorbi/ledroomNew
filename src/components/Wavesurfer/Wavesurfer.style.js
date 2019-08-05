// import styled from '@emotion/styled';
import { css } from '@emotion/core';

const WavesurferStyle = {
  container: css`
    position:relative;

    .wavesurfer-region{
      transition: background-color .25s ease-in-out;
    }

    .wavesurfer-handle-start,
    .wavesurfer-handle-end{
      width: 100% !important;
      background-color: rgba(255, 255, 255, .15);
    }

    .wavesurfer-handle-start{
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    .wavesurfer-handle-end{
      left: calc(100% - 4px) !important;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }


  `,
  marginBottom: css`
    margin-bottom:20px;
  `,
};

export default WavesurferStyle;
