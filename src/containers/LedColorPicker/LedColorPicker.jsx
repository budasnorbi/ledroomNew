// Core
import React, { Component, createRef } from 'react';

// PropTypes
// ?import PropTypes from 'prop-types';
// import LedColorPickerShape from './LedColorPickerShape';

// Style

// import style from './style';

// Redux
// import { connect } from 'redux';
// import { mapStateToProps, mapDispatchToProps } from './redux';

// Color picker
import ColorPicker from 'simple-color-picker';
import '../../../node_modules/simple-color-picker/src/simple-color-picker.css';

// eslint-disable-next-line react/prefer-stateless-function
class LedColorPicker extends Component {
  colorPicker;

  pickerContainer = createRef();

  componentDidMount() {
    this.colorPicker = new ColorPicker({
      color: '#FF0000',
      background: '#454545',
      el: document.body,
      width: this.pickerContainer.current.getBoundingClientRect().width,
      height: 200,
    });

    this.colorPicker.appendTo(this.pickerContainer.current);
  }

  render() {
    return (
      <div ref={this.pickerContainer} />
    );
  }
}

// LedColorPicker.propTypes = LedColorPickerShape;

/* export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LedColorPicker); */
export default LedColorPicker;
