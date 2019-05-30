import { css } from '@emotion/core';

const style = {
  margin: css`
    margin: 15px 0;
  `,
  flexGrow: css`
    flex-grow: 1;
  `,
  timePicker: css`
    width: 100%;

    & > input {
      text-align: center;
    }
  `,
  leftMargin: css`
    margin-left:10px;
  `,
  rightMargin: css`
    margin-right: 10px;
  `,
  colorPickerButton: css`
    border:none;
    border-radius:50%;
    height:30px;
    width:30px;
    outline: none;
    display:block;
    margin: 0 auto;
   
    background-color:red;
    transition: opacity .15s ease-in-out;

    &:hover{
      opacity: .75;
      cursor: pointer;
    }
  `,
  colorPickerTitle: css`
    text-align: center;
  `,
};

export default style;
