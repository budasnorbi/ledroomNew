// Core
import React, { Component } from 'react';

// PropTypes
// ?import PropTypes from 'prop-types';
import __compName__Shape from './__compName__Shape';

// Style
/** @jsx jsx */
import { jsx } from '@emotion/core';
import style from './style';

// Utils
// import {} from './utils';

// Redux
import { connect } from 'redux'; 
import { mapStateToProps, mapDispatchToProps } from './redux';

class __compName__ extends Component {
  render(){
    return(
      <>
      </>
    );
  }
}

__compName__.propTypes = __compName__Shape;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(__compName__);
