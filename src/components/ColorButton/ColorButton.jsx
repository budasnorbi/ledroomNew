// Core
import React, { Component } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import { connect } from 'react-redux';
import types from './ColorButton.types';

// Style
import style from './ColorButton.style';

// Utils
// import util from './ColorButton.util';

// Redux
import { mapDispatchToProps } from './ColorButton.redux';

// Childrens

class ColorButton extends Component {
  ref = React.createRef();

  componentDidMount() {
    const { setColorPickerPosition } = this.props;
    const { left, top } = this.ref.current.getBoundingClientRect();

    setColorPickerPosition({ left, top });
  }

  render() {
    const { color } = this.props;
    return (
      <button
        type="button"
        className="button"
        css={style.color}
        key={color}
        style={{ backgroundColor: color }}
        ref={this.ref}
      />
    );
  }
}

ColorButton.propTypes = types;

export default connect(
  null,
  mapDispatchToProps,
)(ColorButton);
