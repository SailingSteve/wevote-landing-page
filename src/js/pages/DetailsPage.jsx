import React, { Component } from 'react';

import iceland from '../../img/demo/Iceland.jpg';
import { formatDateToYearMonthDay } from '../utils/dateFormat';

export default class DetailsPage extends Component {

  render () {
    console.log('Render DetailsPage.jsx');
    // const rawDateString = new Date().toString();
    const fancyDate = formatDateToYearMonthDay('2020-01-11 17:10:45.599791+00');

    return (
      <div>
        <h1>This is the Details (Iceland) page!</h1>
        <h1>
          This is the date to prove lazy loading of moment.js:&nbsp;&nbsp;
          {fancyDate}
        </h1>
        <img src={iceland} alt="World" style={{ maxWidth: 500, height: 'auto', maxHeight: 600 }} />
      </div>
    );
  }
}
