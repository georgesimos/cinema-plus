import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCinemas } from '../../../store/actions';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { CinemaToolbar } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import AddMovie from './components/AddCinema/AddCinema';
import CinemaCard from '../../Public/components/CinemaCard/CinemaCard';

class CinemaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      editCinema: null,
      error: null,
      openEditDialog: false
    };
    this.signal = true;
  }

  componentDidMount() {
    this.signal = true;
    this.props.getCinemas();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  openEditDialog = cinema => {
    this.setState({ openEditDialog: true, editCinema: cinema });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editCinema: null });
  };

  editCinema(cinema) {
    this.OpenEditDialog(cinema);
  }

  renderCinemas() {
    const { classes, cinemas } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (cinemas.length === 0) {
      return (
        <Typography variant="h6">There are no cinemas available</Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {cinemas.map(cinema => (
          <Grid
            item
            key={cinema._id}
            lg={4}
            md={6}
            xs={12}
            onClick={() => this.openEditDialog(cinema)}>
            <CinemaCard cinema={cinema} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const { editCinema } = this.state;
    return (
      <Dashboard title="Cinemas">
        <div className={classes.root}>
          <CinemaToolbar />
          <div className={classes.content}>{this.renderCinemas()}</div>
          <ResponsiveDialog
            id="Edit-cinema"
            open={this.state.openEditDialog}
            handleClose={() => this.CloseEditDialog()}>
            <AddMovie edit={editCinema} />
          </ResponsiveDialog>
        </div>
      </Dashboard>
    );
  }
}

CinemaList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ cinemasState }) => ({
  cinemas: cinemasState.cinemas
});

const mapDispatchToProps = { getCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CinemaList));
