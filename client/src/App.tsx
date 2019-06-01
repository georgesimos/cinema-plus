import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Dash from './components/Dash/Dash'

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dash} />
    </Router>
  );
}
export default App;
