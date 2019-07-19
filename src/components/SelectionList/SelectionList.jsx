// Core
import { Component } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
// import types from './SelectionList.types';

// Style
import style from './SelectionList.style';

// Utils
// import util from './SelectionList.util';

// Redux
// import redux from './SelectionList.redux';
// import { connect } from 'redux';


// Childrens

class SelectionList extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <ul>
        <li css={style.item}>

          <div>
            <div css={style.rangeContainer}>
              <div css={style.inputWidth} className="control">
                <input css={style.ledInput} className="input" type="text" placeholder="start" />
              </div>
              <span css={style.dash}> - </span>
              <div css={style.inputWidth} className="control">
                <input css={style.ledInput} className="input" type="text" placeholder="end" />
              </div>
            </div>

            <div css={style.colorContainer}>
              <button
                type="button"
                className="button"
                css={style.colorAdd}
              >
                <span className="icon is-small">
                  <i className="ion ion-md-add" />
                </span>
                &nbsp;
                color
              </button>
              <button
                type="button"
                className="button"
                css={style.color}
              />
              <button
                type="button"
                className="button"
                css={style.color}
              />
              <button
                type="button"
                className="button"
                css={style.color}
              />
              <button
                type="button"
                className="button"
                css={style.color}
              />
              <button
                type="button"
                className="button"
                css={style.color}
              />
              <button
                type="button"
                className="button"
                css={style.color}
              />
              <button
                type="button"
                className="button"
                css={style.color}
              />
            </div>
          </div>

          <div css={style.optionContainer}>
            <button
              type="button"
              className="button"
              css={style.optionButton}
            >
              <span css={style.option} className="icon">
                <i className="ion ion-md-lock" />
              </span>
            </button>

            <button
              type="button"
              className="button"
              css={style.optionButton}
            >
              <span css={style.option} className="icon">
                <i className="ion ion-md-trash" />
              </span>
            </button>
          </div>

        </li>
      </ul>
    );
  }
}

// SelectionList.propTypes = types;

// export default connect(...redux)(SelectionList);
export default SelectionList;
