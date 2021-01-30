import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './utilities/ErrorBoundary';
import PageHeader from './js/components/PageHeader';
import WeVoteRouter from './js/WeVoteRouter';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';

const Home = React.lazy(() => import('./js/pages/Home'));
const DetailsPage = React.lazy(() => import('./js/pages/DetailsPage'));
const CommentsPage = React.lazy(() => import('./js/pages/CommentsPage'));
const UpdatesPage = React.lazy(() => import('./js/pages/UpdatesPage'));
const PageNotFound = React.lazy(() => import('./js/pages/PageNotFound'));

// An amazingly clear description on how to build up a react app from scratch, and why each component is needed and what it does
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
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={styledTheme}>
              <WeVoteRouter>
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
              </WeVoteRouter>
            </ThemeProvider>
          </MuiThemeProvider>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
