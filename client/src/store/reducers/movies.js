import { GET_MOVIES } from '../types';

const initialState = {
  movies: [],
  latestMovies: []
};

const getMovies = (state, payload) => {
  const latestMovies = payload
    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
    .slice(0, 5);
  return { ...state, movies: payload, latestMovies };
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES:
      return getMovies(state, payload);
    default:
      return state;
  }
};
