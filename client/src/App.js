// @ts-nocheck
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions';

import theme from './theme';
import { Alert } from './components';
import Routes from './Routes';

import './assets/scss/index.scss';
import 'typeface-montserrat';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  async componentDidMount() {
    try {
      await store.dispatch(loadUser());
    } catch (error) {
      console.error('Failed to load user:', error);
      // Ошибка уже обработана в loadUser action
    }
    pageCursors();

  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Routes />
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
