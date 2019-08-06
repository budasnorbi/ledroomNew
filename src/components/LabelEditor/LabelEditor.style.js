import { css } from '@emotion/core';

const style = {
  margin: css`
    margin: 10px 0;
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
  colorPickerTitle: css`
    text-align: center;
  `,
  ledIndexInput: css`
    width: 100%;
  `,
  colorPicker: css`
    .react-color-picker__hue-spectrum{
      margin-left:0px !important;
    }
  `,
  labelOptionWrapper: css`

  `,
  LabelEditorWrapper: css`
    padding:0;
    background: transparent;
  `,
  selectionList: css`
    max-height:582px;
    overflow-y: auto;
  `,
  colorAdd: css`
    margin-left: 2px;
    border-radius: calc((35.99 / 2) * 1px);
    color:white;
    border: none;
    background-color: rgba(255, 255, 255, .15);
    line-height: 100%;

    &:hover, &:focus {
      color: white;
      /* background-color: #2f2f2f; */
    }
  `,
  colorContainer: css`
    height:56px;
    padding: 10px 5px 10px 0px;
    overflow-x: auto;
    overflow-y: hidden;
  `,
  ledInput: css`
    width: 80%;
    background-color: rgba(255, 255, 255, .15);
    border:none;
    color:white;
    outline: none;
    text-align:center;

    &::-webkit-input-placeholder{
      color: rgba(255, 255, 255, .85) !important;
      text-align:inherit;
    }

    &:active, &:focus{
      box-shadow:0 0 0 0.125em rgba(255, 255, 255, .25);
    }
  `,
  rangeContainer: css`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px 5px 0;
  `,
  dash: css`
    margin: 0 10px;
    color: white;
    color: rgba(255, 255, 255, .15);
  `,
};

export default style;
