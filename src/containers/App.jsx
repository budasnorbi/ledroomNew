import React from 'react';

import Waveform from './Waveform/Waveform';

const App = () => (
  <div className="columns">
    <div className="column" />
    <div className="column is-three-quarters">
      <Waveform />
    </div>
    <div className="column" />
  </div>
);

export default App;
