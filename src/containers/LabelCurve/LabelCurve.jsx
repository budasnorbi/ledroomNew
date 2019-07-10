// Core
import React, { Component } from 'react';

// PropTypes
// ?import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
// import LabelCurveShape from './LabelCurveShape';
import '@mojs/core';
import './mojs-curve-editor.min';

// Style
/** @jsx jsx */
// import style from './style';

// Utils
// import {} from './utils';

// Redux
// import { connect } from 'redux';
// import { mapStateToProps, mapDispatchToProps } from './redux';

class LabelCurve extends Component {
  ref = React.createRef();

  componentDidMount() {
    new MojsCurveEditor({
      name: 'some name',
      startPath: 'M0, 100 L100, 0',
      isSaveState: true,
      /* onChange: path => console.log(path), */
      root: this.ref.current,
    });
  }

  render() {
    return (
      <div ref={this.ref} />
    );
  }
}

// LabelCurve.propTypes = LabelCurveShape;

/*
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelCurve);
*/
export default LabelCurve;
