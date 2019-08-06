// import styled from '@emotion/styled';
import { css } from '@emotion/core';

const SelectionItemStyle = {
  item: css`
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
        
    &:not(:last-child){
      border-bottom: solid 1px rgba(255, 255, 255, .15);
    }
  `,
  rangeContainer: css`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-basis: 35%;

    padding: 5px 5px 5px 0;
  `,
  dash: css`
    margin: 0 10px;
    color: white;
    color: rgba(255, 255, 255, .15);
  `,
  colorContainer: css`
    padding: 10px 5px 10px 0px;
    display: flex;
    flex-wrap: wrap;
  `,
  colorAdd: css`
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
  ledInput: css`
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
  optionContainer: css`
    display:flex;
    flex-direction:column;
    justify-content: flex-end;
    padding: 5px 20px;
  `,
  option: css`
    font-size: 24px;
    color: rgba(255,255,255, .25);

    transition: color .15s ease-in-out;

    &:hover{
      color: unset;
    }
  `,
  optionButton: css`
    border-radius: 50%;
    width: 35px;
    height: 35px;
    padding:0;
    border: none;
    background-color: transparent;

    transition: background-color .15s ease-in-out;

    &:focus:not(:active){
      box-shadow: unset;
    }

    &:hover{
      background-color: rgba(255, 255, 255, .3);
    }
  `,
};

export default SelectionItemStyle;
