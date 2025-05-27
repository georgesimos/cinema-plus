import React from 'react';
import { Redirect } from 'react-router-dom';
import { MainLayout } from './layouts';
import Home from './pages/Public/Home';
import Login from './pages/Public/Login';
import Register from './pages/Public/Register';
import MovieDetails from './pages/Public/MovieDetails';
import BookingPage from './pages/Public/BookingPage';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import MovieList from './pages/Admin/MovieList';
import CinemaList from './pages/Admin/CinemaList';
import ShowtimeList from './pages/Admin/ShowtimeList';
import ReservationList from './pages/Admin/ReservationList';
import UserList from './pages/Admin/UserList';
import AddMovie from './pages/Admin/MovieList/components/AddMovie';
import AddCinema from './pages/Admin/CinemaList/components/AddCinema';
import AddShowtime from './pages/Admin/ShowtimeList/components/AddShowtime';
import ConfigureSeats from './pages/Admin/CinemaList/components/ConfigureSeats/ConfigureSeats';

const routes = [
  {
    path: '/',
    component: MainLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
      {
        path: '/movie/:id',
        component: MovieDetails
      },
      {
        path: '/booking/:id',
        component: BookingPage
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    routes: [
      {
        path: '/admin',
        exact: true,
        component: () => <Redirect to="/admin/dashboard" />
      },
      {
        path: '/admin/dashboard',
        component: Dashboard
      },
      {
        path: '/admin/movies',
        component: MovieList
      },
      {
        path: '/admin/cinemas',
        component: CinemaList
      },
      {
        path: '/admin/showtimes',
        component: ShowtimeList
      },
      {
        path: '/admin/reservations',
        component: ReservationList
      },
      {
        path: '/admin/users',
        component: UserList
      },
      {
        path: '/admin/add-movie',
        component: AddMovie
      },
      {
        path: '/admin/add-cinema',
        component: AddCinema
      },
      {
        path: '/admin/add-showtime',
        component: AddShowtime
      },
      {
        path: '/admin/cinemas/configure-seats/:id',
        exact: true,
        component: ConfigureSeats,
        auth: true,
        admin: true
      }
    ]
  }
];

export default routes; 