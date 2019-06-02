import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme'
// import Login from './views/Login'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import Dashboard from './views/Dashboard'
import UserList from './views/UserList'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/users" component={UserList} />
        </Switch>
      </Router>
    </MuiThemeProvider>

  );
}
export default App;
