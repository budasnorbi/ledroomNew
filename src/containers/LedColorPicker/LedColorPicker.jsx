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
  colorPicker;

  pickerContainer = createRef();

  closePicker = this.closePicker.bind(this);

  componentDidMount() {
    const {
      setColor, labelId, selectionId, colorIndex,
    } = this.props;
    this.colorPicker = new ColorPicker({
      color: '#FF0000',
      background: '#454545',
      el: document.body,
      width: 250,
      height: 200,
    });

    this.colorPicker.appendTo(this.pickerContainer.current);

    this.colorPicker.onChange(color => setColor({
      color,
      labelId,
      selectionId,
      colorIndex,
    }));
  }

  closePicker(e) {
    const { setColorPickerClose } = this.props;

    setColorPickerClose();
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
      </div>
    );
  }
}

// LedColorPicker.propTypes = LedColorPickerShape;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LedColorPicker);
