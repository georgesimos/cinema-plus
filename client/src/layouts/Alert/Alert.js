import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomizedSnackbar from '../../components/CustomizedSnackbar';

const Alert = ({ alerts }) =>
  alerts.length > 0 &&
  alerts.map((alert, index) => (
    <CustomizedSnackbar
      key={`custom-alert-${index}-${alert.id}`}
      isOpen={true}
      vertical="top"
      horizontal="right"
      variant={alert.alertType}
      message={alert.msg}
    />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

Alert.defaultProps = {
  alerts: []
};

const mapStateToProps = state => ({
  alerts: state.alertState.alerts
});
export default connect(mapStateToProps)(Alert);
