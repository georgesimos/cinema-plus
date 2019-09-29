import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//Redux
import { Provider } from 'react-redux';
import store from './store';
// import history from './utils/history';
import theme from './theme';
import ProtectedRoute from './routes/ProtectedRoute';
import Alert from './layouts/Alert/Alert';
import { loadUser } from './store/actions';

const Register = lazy(() => import('./pages/Admin/Register/Register'));
const Login = lazy(() => import('./pages/Admin/Login/Login'));
const DashboardPage = lazy(() =>
  import('./pages/Admin/DashboardPage/DashboardPage')
);
const UserList = lazy(() => import('./pages/Admin/UserList'));
const Account = lazy(() => import('./pages/Admin/Account'));
const MovieList = lazy(() => import('./pages/Admin/MovieList/MovieList'));

const MoviePage = lazy(() => import('./pages/Public/MoviePage/MoviePage'));
const Movie = lazy(() => import('./pages/Public/Movie/Movie'));
const MovieBooking = lazy(() =>
  import('./pages/Public/MovieBooking/MovieBooking')
);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Alert />
        <Suspense fallback={<h1>Loading route ...</h1>}>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={MoviePage} />
              <Route exact path="/movie/:id" component={Movie} />
              <Route exact path="/movie/booking/:id" component={MovieBooking} />
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
          </HashRouter>
        </Suspense>
      </MuiThemeProvider>
    </Provider>
  );
};
export default App;
