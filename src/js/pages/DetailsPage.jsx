import React, { Component } from 'react';

import iceland from '../../img/demo/Iceland.jpg';

export default class DetailsPage extends Component {
  render () {
    console.log('Render DetailsPage.jsx');
    return (
      <div>
        <h1>This is the Details (Iceland) page!</h1>
        <img src={iceland} alt="World" style={{ maxWidth: 500, height: 'auto', maxHeight: 600 }} />
      </div>
    );
  }
}
