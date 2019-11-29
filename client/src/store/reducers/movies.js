import { GET_MOVIES, SELECT_MOVIE,GET_SUGGESTIONS } from '../types';

const initialState = {
  movies: [],
  randomMovie: null,
  latestMovies: [],
  nowShowing: [],
  comingSoon: [],
  selectedMovie: null,
  suggested:[]
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

  return {
    ...state,
    movies: payload,
    randomMovie: payload[Math.floor(Math.random() * payload.length)],
    latestMovies,
    nowShowing,
    comingSoon
  };
};

const onSelectMovie = (state, payload) => ({
  ...state,
  selectedMovie: payload
});

const getMovieSuggestions = (state, payload) =>({
  ...state,
  suggested: payload
})

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES:
      return getMovies(state, payload);
    case SELECT_MOVIE:
      return onSelectMovie(state, payload);
    case GET_SUGGESTIONS:
      return getMovieSuggestions(state, payload);
    default:
      return state;
  }
};
