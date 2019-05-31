import { css } from '@emotion/core';

const style = {
  flexGrow: css`
    flex-grow: 1;
  `,
  timePicker: css`
    width: 100%;

    & > input {
      text-align: center;
    }
  `,
  timePickerMargin: css`
    &:nth-child(1){
      margin-right: 15px;
    }

    &:nth-child(2){
      margin-left: 15px;
    }
  `,
};

export default style;
