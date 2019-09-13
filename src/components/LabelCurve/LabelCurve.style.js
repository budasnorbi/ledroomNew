import { css } from '@emotion/core';

const style = {
  heading: css`
    color: white !important;
    margin-bottom: 10px !important;
  `,
  curveContainer: css`
    position:relative;
    &:not(:last-child) {
      margin-bottom:21px;
    }
  `,
  timeline: css`
    width:1px;
    height:125px;
    background-color:white;

    position:absolute;
    bottom:0;
    left:0px;
  `,
};

export default style;
