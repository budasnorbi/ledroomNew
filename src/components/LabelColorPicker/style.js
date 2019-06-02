// import styled from '@emotion/styled';
import { css } from '@emotion/core';

const style = {
  labelColorMargin: css`
    &:nth-child(1){
      margin-right: 15px;
    }

    &:nth-child(2){
      margin-left: 15px;
    }
  `,
  colorPickerButton: css`
    border: none;
    border-radius:50%;
    height: 30px;
    width: 30px;
    outline: none;
    display: block;
    margin: 0 auto;

    background-color:red;
    transition: opacity .15s ease-in-out;

    &:hover{
      opacity: .75;
      cursor: pointer;
    }
  `,
  flexGrow: css`
    flex-grow: 1;
  `,
};

export default style;
