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
  addSelection: css`
    width: 100%;
  `,
};

export default style;
