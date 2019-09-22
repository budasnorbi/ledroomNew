// Core
import React, { PureComponent } from 'react';
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

class ColorButton extends PureComponent {
  ref = React.createRef();

  modifyColor = this.modifyColor.bind(this);

  componentDidMount() {
    const { moveColorPicker } = this.props;
    const { left, top } = this.ref.current.getBoundingClientRect();
    moveColorPicker({ left, top });
  }

  modifyColor() {
    const {
      moveColorPicker, colorIndex, selectColor, color, selectionId, selectSelection, openColorPicker,
    } = this.props;
    const { left, top } = this.ref.current.getBoundingClientRect();

    moveColorPicker({ left, top });

    selectColor({
      colorIndex,
      colorPickerInitColor: color,
    });

    selectSelection({ selectionId });

    openColorPicker();
  }

  render() {
    const { color } = this.props;

    return (
      <button
        type="button"
        className="button"
        css={style.color}
        key={color}
        style={{ backgroundColor: `rgb(${color})` }}
        ref={this.ref}
        onClick={this.modifyColor}
      />
    );
  }
}

// ColorButton.propTypes = types;

export default connect(
  null,
  mapDispatchToProps,
)(ColorButton);
