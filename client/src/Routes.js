import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import ProtectedRoute from './routes/ProtectedRoute';

// Admin
const DashboardPage = lazy(() =>
  import('./pages/Admin/DashboardPage/DashboardPage')
);
const MovieList = lazy(() => import('./pages/Admin/MovieList/MovieList'));
const CinemaList = lazy(() => import('./pages/Admin/CinemaList/CinemaList'));
const ShowTimes = lazy(() => import('./pages/Admin/ShowTimes/ShowTimes'));
const ReservationList = lazy(() => import('./pages/Admin/ReservationList'));
const User = lazy(() => import('./pages/Admin/User'));
const Account = lazy(() => import('./pages/Admin/Account'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register/Register'));
const Login = lazy(() => import('./pages/Public/Login/Login'));

// Public
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const MoviePage = lazy(() => import('./pages/Public/MoviePage'));
const MovieCategoryPage = lazy(() =>
  import('./pages/Public/MovieCategoryPage')
);
const CinemasPage = lazy(() => import('./pages/Public/CinemasPage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage/'));

const Routes = () => {
  return (
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
          <ProtectedRoute exact path="/admin/showtimes" component={ShowTimes} />

          <Route exact path="/admin/reservations" component={ReservationList} />
          <ProtectedRoute exact path="/admin/cinemas" component={CinemaList} />
          <ProtectedRoute exact path="/admin/movies" component={MovieList} />
          <ProtectedRoute exact path="/admin/account" component={Account} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
