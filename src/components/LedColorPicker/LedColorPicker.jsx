// Core
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component, createRef } from 'react';

// PropTypes
// ?import PropTypes from 'prop-types';
// import LedColorPickerShape from './LedColorPickerShape';

// Style

import ColorPicker from 'simple-color-picker';
import { connect } from 'react-redux';
import style from './style';

// Redux
import { mapStateToProps, mapDispatchToProps } from './redux';

// Color picker
import '../../../node_modules/simple-color-picker/src/simple-color-picker.css';

// eslint-disable-next-line react/prefer-stateless-function
class LedColorPicker extends Component {
  pickerContainer = createRef();

  closePicker = this.closePicker.bind(this);

  deleteColor = this.deleteColor.bind(this);

  componentDidMount() {
    const { setColor } = this.props;

    this.colorPicker = new ColorPicker({
      color: this.props.colorPickerInitColor,
      background: '#454545',
      el: document.body,
      width: 250,
      height: 200,
    });

    this.colorPicker.appendTo(this.pickerContainer.current);
    this.colorPicker.onChange((color) => {
      if (color === '#000000') { return; }
      const { r, g, b } = this.colorPicker.getRGB();
      const newColor = [r, g, b];

      setColor({
        color: newColor,
        labelId: this.props.labelId,
        selectionId: this.props.selectionId,
        colorIndex: this.props.colorIndex,
      });
    });
  }

  componentDidUpdate() {
    const { colorPickerInitColor } = this.props;
    this.colorPicker.setColor(colorPickerInitColor);
  }

  closePicker() {
    const { closeColorPicker, selectColor } = this.props;

    closeColorPicker();
    selectColor({
      colorIndex: null,
      colorPickerInitColor: null,
    });
  }

  deleteColor() {
    const {
      deleteColor, labelId, selectionId, colorIndex, closeColorPicker, selectColor, setTransitionPath,
      setOpacityPath,
    } = this.props;

    deleteColor({
      labelId,
      selectionId,
      colorIndex,
    });

    closeColorPicker();

    selectColor({
      colorIndex: null,
      colorPickerInitColor: null,
    });

    if (colorIndex === 0) {
      setOpacityPath({
        labelId,
        selectionId,
        path: null,
      });
    }

    if (colorIndex === 1) {
      setTransitionPath({
        labelId,
        selectionId,
        path: null,
      });
    }
  }

  render() {
    const { left, top } = this.props;
    const colorPickerDynamicStyle = {
      left: `${left - (250 / 2) + 18}px`,
      top: `${top + 46}px`,
    };

    return (
      <div style={colorPickerDynamicStyle} css={style.colorPicker} ref={this.pickerContainer}>
        <button
          type="button"
          className="button is-dark"
          onClick={this.closePicker}
          css={style.closeButton}
        >
          <span className="icon is-small">
            <i className="ion-md-close" />
          </span>
        </button>

        <button
          type="button"
          className="button is-dark"
          onClick={this.deleteColor}
          css={style.deleteButton}
        >
          <span className="icon is-small">
            <i className="ion-md-trash" />
          </span>
        </button>

        <div>
          <input
            css={style.ledInput}
            className="input is-small"
            type="text"
            placeholder="R"
          />
          <input
            css={style.ledInput}
            className="input is-small"
            type="text"
            placeholder="G"
          />
          <input
            css={style.ledInput}
            className="input is-small"
            type="text"
            placeholder="B"
          />
        </div>
      </div>
    );
  }
}

// LedColorPicker.propTypes = LedColorPickerShape;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LedColorPicker);
