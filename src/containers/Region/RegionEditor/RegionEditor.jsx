/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

// Style
import style from './style';

class RegionEditor extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <div css={style.margin} className="box">
        bla bla
      </div>
    );
  }
}

export default RegionEditor;
