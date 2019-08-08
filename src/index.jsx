// Core dependencies
import React from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import store from './store/configureStore';

// Bulma css
import '../node_modules/bulma/css/bulma.min.css';

// Icons
import '../node_modules/ionicons/dist/css/ionicons.min.css';

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

module.hot.accept();
