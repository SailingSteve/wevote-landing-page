import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './utilities/ErrorBoundary';
import PageHeader from './js/components/PageHeader';


const Home = React.lazy(() => import('./js/pages/Home'));
const DetailsPage = React.lazy(() => import('./js/pages/DetailsPage'));
const CommentsPage = React.lazy(() => import('./js/pages/CommentsPage'));
const UpdatesPage = React.lazy(() => import('./js/pages/UpdatesPage'));
const PageNotFound = React.lazy(() => import('./js/pages/PageNotFound'));

// https://github.com/rwieruch/minimal-react-webpack-babel-setup
// https://www.robinwieruch.de/webpack-advanced-setup-tutorial

class App extends Component {
  constructor (props) {
    super(props);
    console.log('App.js constructor');
  }

  render () {
    return (
      <ErrorBoundary>
        <Suspense fallback={<span>Loading...</span>}>
          <Router>
            <PageHeader />
            <Switch>
              <Route path="/details">
                <DetailsPage />
              </Route>
              <Route path="/comments">
                <CommentsPage />
              </Route>
              <Route path="/updates">
                <UpdatesPage />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
