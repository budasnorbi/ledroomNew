// import styled from '@emotion/styled';
import { css } from '@emotion/core';

const SelectionListStyle = {
  buttonsContainer: css`
    margin-bottom: 10px;
  `,
  heading: css`
    text-align: center;
    color: white; 
    margin: 5px 0;
  `,
  selectionButton: css`
    width: 100%;
    
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  `,
  addSelection: css`
    width: 50%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `,
  deleteSelection: css`
    width: 50%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;`,
  selectedSelection: css`
    border: solid 2px white !important;
  `,
};

export default SelectionListStyle;
