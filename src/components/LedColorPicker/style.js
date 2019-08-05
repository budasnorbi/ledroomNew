import { css } from '@emotion/core';

const style = {
  colorPicker: css`
    position: absolute;
    border-radius: 3px;
    border:solid 2px white;

    &::after{
      content: '';
      position: absolute;
      left: calc(50% - 2px);
      top: -12px;
      width: 10px;
      height: 10px;
      transform: translateX(-50%);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid white;
    }
    
    .Scp{
      padding: 0 !important;
    }
    .Scp-saturation{
      /* width: 90% !important;*/
      margin-right: 0;
    }

    .Scp-hue{
      width: 25px;
    }

  `,
  closeButton: css`
    position: absolute;
    right: -41px;
    top: -36px;
    border-radius: 50%;
  `,
  deleteButton: css`
    position: absolute;
    right: -41px;
    top: 5px;
    border-radius: 50%;
  `,
};

export default style;
