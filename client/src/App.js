// @ts-nocheck
import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
import Loading from './components/Loading';
import ReservationList from './pages/Admin/ReservationList';
import pageCursors from './utils/pageCursors';

const Register = lazy(() => import('./pages/Public/Register/Register'));
const Login = lazy(() => import('./pages/Public/Login/Login'));

const DashboardPage = lazy(() =>
  import('./pages/Admin/DashboardPage/DashboardPage')
);
const User = lazy(() => import('./pages/Admin/User'));
const ShowTimes = lazy(() => import('./pages/Admin/ShowTimes/ShowTimes'));
const Account = lazy(() => import('./pages/Admin/Account'));
const MovieList = lazy(() => import('./pages/Admin/MovieList/MovieList'));
const CinemaList = lazy(() => import('./pages/Admin/CinemaList/CinemaList'));

const HomePage = lazy(() => import('./pages/Public/HomePage'));
const MoviePage = lazy(() => import('./pages/Public/MoviePage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage/'));
const MovieCategoryPage = lazy(() =>
  import('./pages/Public/MovieCategoryPage')
);
const CinemasPage = lazy(() => import('./pages/Public/CinemasPage'));

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    pageCursors();
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Alert />
        <Suspense fallback={<Loading />}>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/cinemas" component={CinemasPage} />
              <Route
                exact
                path="/movie/category/:category"
                component={MovieCategoryPage}
              />
              <Route exact path="/movie/:id" component={MoviePage} />
              <Route exact path="/movie/booking/:id" component={BookingPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              <ProtectedRoute
                exact
                path="/admin/dashboard"
                component={DashboardPage}
              />
              <ProtectedRoute exact path="/admin/users" component={User} />
              <ProtectedRoute
                exact
                path="/admin/showtimes"
                component={ShowTimes}
              />

              <ProtectedRoute
                exact
                path="/admin/reservations"
                component={ReservationList}
              />
              <ProtectedRoute
                exact
                path="/admin/cinemas"
                component={CinemaList}
              />
              <ProtectedRoute
                exact
                path="/admin/movies"
                component={MovieList}
              />
              <ProtectedRoute exact path="/admin/account" component={Account} />
              <Route path="*" component={() => '404 NOT FOUND'} />
            </Switch>
          </Router>
        </Suspense>
        <div className="cursor" id="cursor" />
        <div className="cursor2" id="cursor2" />
        <div className="cursor3" id="cursor3" />
      </MuiThemeProvider>
    </Provider>
  );
};
export default App;
