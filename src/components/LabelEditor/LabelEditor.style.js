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
  selectionList: css`
    max-height:582px;
    overflow-y: auto;
  `,
  colorAdd: css`
    margin-left: 2px;
    border-radius: calc((35.99 / 2) * 1px);
    color: white;
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
    padding: 10px 10px 10px 0px;
    overflow-x: auto;
    overflow-y: hidden;
  `,
  ledInput: css`
    background-color: rgba(255, 255, 255, .15);
    border:none;
    color:white;
    outline: none;
    text-align:center;
    width:auto;

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
    height:55.99px;
  `,
  colorCurveContainer: css`
    flex-basis: 50%;
  `,
  ledIndexContainer: css`
    flex-basis: 50%;
    padding: 0px 10px 0px 10px;
  `,
  labelEditorContainer: css`
    display: flex;
  `,
  ledHeading: css`
    color: white;
    margin-bottom: 0px !important;
    margin-right: 10px;
    line-height: 27px;
  `,
  ledIndexInputContainer: css`
    display: flex;
  `,
};

export default style;
