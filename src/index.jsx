import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'We Vote Landing Page App';
console.log('STARTED index.jsx');
ReactDOM.render(
  <App title={title} />,
  document.getElementById('app'),
);

module.hot.accept();
