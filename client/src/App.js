import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import history from './utils/history';
import theme from './theme';
// import Login from './views/Login'
import Register from './pages/Admin/Register/Register';
import Login from './pages/Login/Login';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import UserList from './pages/UserList';
import Account from './pages/Account';
import ProtectedRoute from './routes/ProtectedRoute';
import Alert from './layouts/Alert/Alert';
import { loadUser } from './store/actions';
import MoviePage from './pages/Public/MoviePage/MoviePage';
import MovieList from './pages/MovieList/MovieList';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Alert />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={MoviePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute
              exact
              path="/admin/dashboard"
              component={DashboardPage}
            />
            <ProtectedRoute exact path="/admin/users" component={UserList} />
            <Route exact path="/admin/movies" component={MovieList} />
            <ProtectedRoute exact path="/admin/account" component={Account} />
            <Route path="*" component={() => '404 NOT FOUND'} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};
export default App;
