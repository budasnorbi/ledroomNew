// import styled from '@emotion/styled';
import { css } from '@emotion/core';

const LabelListStyle = {
  heading: css`
    text-align: center;
    color: white; 
    margin: 5px 0;
  `,
  labelButton: css`
    width: 100%;
    
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  `,
  buttonsContainer: css`
    margin-bottom: 10px;
  `,
  addLabel: css`
    width: 50%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `,
  deleteLabel: css`
    width: 50%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `,
  selectedLabel: css`
    border: solid 2px white !important;
  `,
};

export default LabelListStyle;
