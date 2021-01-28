import React from 'react';

import thailand from '../../img/demo/Thailand.jpg';

export default class UpdatesPage extends React.Component {
  render () {
    console.log('Render UpdatesPage.jsx');

    return (
      <div>
        <h1>This is the Updates (Thailand) page!</h1>
        <img src={thailand} alt="World" style={{ maxWidth: 500, height: 'auto', maxHeight: 600 }} />
      </div>
    );
  }
}
