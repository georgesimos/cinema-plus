import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from './history';
import theme from './theme';
// import Login from './views/Login'
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import UserList from './views/UserList';
import Account from './views/Account';
import { ProtectedRoute } from './routes/ProtectedRoute';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" component={SignIn} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/users" component={UserList} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};
export default App;
