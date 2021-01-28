import React from 'react';

import japan from '../../img/demo/Japan.jpg';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import VoterActions from '../actions/VoterActions';
import VoterStore from '../stores/VoterStore';
import cookies from '../utils/cookies';

export default class CommentsPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      googleCivicElectionId: 0,
      locationGuessClosed: null,
      textForMapSearch: null,
      voter: {},
      voterDeviceId: '',
    };
  }

  componentDidMount () {
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
    this.appStoreListener = AppStore.addListener(this.onAppStoreChange.bind(this));
    import('jquery').then(({ default: jquery }) => {
      window.jQuery = jquery;
      window.$ = jquery;

      VoterActions.voterRetrieve();
      let { hostname } = window.location;
      hostname = hostname || '';
      AppActions.siteConfigurationRetrieve(hostname);
      console.log('CommentsPage, componentDidMount');
      // dumpCookies();
    }).catch((error) => console.error('An error occurred while loading jQuery', error));
    // console.log('CommentsPage, YOU GET HERE EVEN IF JQUERY DID NOT LOAD componentDidMount');
  }

  componentWillUnmount () {
    this.appStoreListener.remove();
    this.voterStoreListener.remove();
  }

  onVoterStoreChange () {
    const voterDeviceId = VoterStore.voterDeviceId();
    console.log('===== VoterRetrieve from CommentsPage, voterDeviceId:', voterDeviceId);

    this.setState({
      googleCivicElectionId: parseInt(VoterStore.electionId(), 10),
      locationGuessClosed: cookies.getItem('location_guess_closed'),
      textForMapSearch: VoterStore.getTextForMapSearch(),
      voter: VoterStore.getVoter(),
      voterDeviceId,
    });
    console.log('onVoterStoreChange voterDeviceId: ', voterDeviceId);
  }

  onAppStoreChange () {
    console.log('CommentsPage, onAppStoreChange storeSignInStartFullUrl: ', AppStore.storeSignInStartFullUrl());
  }

  render () {
    console.log('Render CommentsPage.jsx');
    const { voterDeviceId } = this.state;

    return (
      <div>
        <h1>This is the Comments (Japan) page!</h1>
        <h2 style={{
          fontSize: 12,
          fontFamily: 'courier,arial,helvetica',
          fontWeight: 'normal',
          marginBottom: 20 }}
        >
          voterDeviceId:&nbsp;&nbsp;&nbsp;
          {voterDeviceId}
        </h2>
        <h3 style={{ padding: 20 }}>(Proof that Flux and API fetching is working)</h3>
        <img src={japan} alt="World" style={{ maxWidth: 500, height: 'auto', maxHeight: 600 }} />
      </div>
    );
  }
}
