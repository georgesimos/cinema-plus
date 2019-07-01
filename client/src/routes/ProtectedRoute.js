import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};
ProtectedRoute.defaultProps = {
  isAuthenticated: false
};
const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});
export default connect(mapStateToProps)(ProtectedRoute);
