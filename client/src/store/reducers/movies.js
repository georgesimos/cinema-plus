import { GET_MOVIES, SELECT_MOVIE } from '../types';

const initialState = {
  movies: [],
  latestMovies: [],
  nowShowing: [],
  comingSoon: [],
  selectedMovie: null
};

const getMovies = (state, payload) => {
  const latestMovies = payload
    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
    .slice(0, 5);

  const nowShowing = payload.filter(
    movie =>
      new Date(movie.endDate) >= new Date() &&
      new Date(movie.releaseDate) < new Date()
  );

  const comingSoon = payload.filter(
    movie => new Date(movie.releaseDate) > new Date()
  );

  return { ...state, movies: payload, latestMovies, nowShowing, comingSoon };
};

const onSelectMovie = (state, payload) => ({
  ...state,
  selectedMovie: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES:
      return getMovies(state, payload);
    case SELECT_MOVIE:
      return onSelectMovie(state, payload);
    default:
      return state;
  }
};
