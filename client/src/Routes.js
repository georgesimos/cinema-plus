import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';

// Admin
const DashboardPage = lazy(() => import('./pages/Admin/Dashboard'));
const MovieList = lazy(() => import('./pages/Admin/MovieList'));
const CinemaList = lazy(() => import('./pages/Admin/CinemaList'));
const ShowTimes = lazy(() => import('./pages/Admin/Showtimes'));
const ReservationList = lazy(() => import('./pages/Admin/ReservationList'));
const User = lazy(() => import('./pages/Admin/User'));
const Account = lazy(() => import('./pages/Admin/Account'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register'));
const Login = lazy(() => import('./pages/Public/Login'));

// Public
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const MoviePage = lazy(() => import('./pages/Public/MoviePage'));
const MovieCategoryPage = lazy(() =>
  import('./pages/Public/MovieCategoryPage')
);
const CinemasPage = lazy(() => import('./pages/Public/CinemasPage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <WithLayoutRoute
            exact
            path="/"
            layout={PublicLayout}
            component={HomePage}
          />
          <WithLayoutRoute
            exact
            path="/cinemas"
            layout={PublicLayout}
            component={CinemasPage}
          />
          <WithLayoutRoute
            exact
            path="/movie/category/:category"
            layout={PublicLayout}
            component={MovieCategoryPage}
          />
          <WithLayoutRoute
            exact
            path="/movie/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={MoviePage}
          />
          <WithLayoutRoute
            exact
            path="/movie/booking/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={BookingPage}
          />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            layout={AdminLayout}
            component={DashboardPage}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            layout={AdminLayout}
            component={User}
          />
          <ProtectedRoute
            exact
            path="/admin/showtimes"
            layout={AdminLayout}
            component={ShowTimes}
          />
          <ProtectedRoute
            exact
            path="/admin/reservations"
            layout={AdminLayout}
            component={ReservationList}
          />
          <ProtectedRoute
            exact
            path="/admin/cinemas"
            layout={AdminLayout}
            component={CinemaList}
          />
          <ProtectedRoute
            exact
            path="/admin/movies"
            layout={AdminLayout}
            component={MovieList}
          />
          <ProtectedRoute
            exact
            path="/admin/account"
            layout={AdminLayout}
            component={Account}
          />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
