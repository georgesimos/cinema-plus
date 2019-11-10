// @ts-nocheck
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions';

import theme from './theme';
import Alert from './layouts/Alert/Alert';
import pageCursors from './utils/pageCursors';
import Routes from './Routes';

import './assets/scss/index.scss';
import 'typeface-montserrat';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    pageCursors();
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Alert />
          <Routes />
          <div className="cursor" id="cursor" />
          <div className="cursor2" id="cursor2" />
          <div className="cursor3" id="cursor3" />
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
