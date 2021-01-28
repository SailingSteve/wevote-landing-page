import React from 'react';
import VoterActions from '../actions/VoterActions';
import VoterStore from '../stores/VoterStore';

import thailand from '../../img/demo/Thailand.jpg';

export default class UpdatesPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      voter: {},
      voterDeviceId: '',
    };
  }

  componentDidMount () {
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
    import('jquery').then(({ default: jquery }) => {
      window.jQuery = jquery;
      window.$ = jquery;

      VoterActions.voterRetrieve();
      console.log('UpdatesPage, componentDidMount');
      // dumpCookies();
    }).catch((error) => console.error('An error occurred while loading jQuery', error));
    // console.log('CommentsPage, YOU GET HERE EVEN IF JQUERY DID NOT LOAD componentDidMount');
  }

  componentWillUnmount () {
    this.voterStoreListener.remove();
  }

  onVoterStoreChange () {
    const voterDeviceId = VoterStore.voterDeviceId();
    console.log('===== VoterRetrieve from UpdatesPage, voterDeviceId:', voterDeviceId);

    this.setState({
      voter: VoterStore.getVoter(),
      voterDeviceId,
    });
    console.log('onVoterStoreChange voterDeviceId: ', voterDeviceId);
  }

  render () {
    console.log('Render UpdatesPage.jsx');
    let { voter: { full_name: voterFullName }} = this.state;
    // eslint-disable-next-line no-bitwise
    voterFullName = voterFullName || '(loading)';

    return (
      <div>
        <h1>This is the Updates (Thailand) page!</h1>
        <h2 style={{
          fontSize: 12,
          fontFamily: 'courier,arial,helvetica',
          fontWeight: 'normal',
          marginBottom: 20 }}
        >
          Voter&apos;s &quot;full name&quot;:&nbsp;&nbsp;&nbsp;
          {voterFullName}
        </h2>
        <h3 style={{ padding: 20 }}>(Proof that Flux and API fetching is working, for a single VoterStore import)</h3>

        <img src={thailand} alt="World" style={{ maxWidth: 500, height: 'auto', maxHeight: 600 }} />
      </div>
    );
  }
}
