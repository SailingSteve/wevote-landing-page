import Dispatcher from "../dispatcher/Dispatcher";

module.exports = {
  ignore: function (we_vote_id) {
    Dispatcher.loadEndpoint("organizationFollowIgnore", { organization_we_vote_id: we_vote_id} );
  },

  follow: function (we_vote_id) {
    Dispatcher.loadEndpoint("organizationFollow", { organization_we_vote_id: we_vote_id} );
  },

  stopFollowing: function (we_vote_id) {
    Dispatcher.loadEndpoint("organizationStopFollowing", { organization_we_vote_id: we_vote_id} );
  },

  retrieveGuidesToFollow: function (election_id) {
    Dispatcher.loadEndpoint("voterGuidesToFollowRetrieve", { google_civic_election_id: election_id });
  },

  retrieveGuidesFollowed: function () {
    Dispatcher.loadEndpoint("voterGuidesFollowedRetrieve");
  }
};
