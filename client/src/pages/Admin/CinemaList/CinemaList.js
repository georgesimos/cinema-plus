import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCinemas, removeCinemas } from '../../../store/actions';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Button } from '@material-ui/core';
import { AddCinema, CinemaToolbar } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import CinemaCard from '../../Public/components/CinemaCard/CinemaCard';
import { match } from '../../../utils';

class CinemaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editCinema: null,
      openEditDialog: false,
      search: '',
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadCinemas();
  }

  loadCinemas = async () => {
    const { cinemas, getCinemas } = this.props;
    if (!cinemas.length && !this.state.isLoading) {
      this.setState({ isLoading: true });
      try {
        await getCinemas();
      } catch (error) {
        console.error('Ошибка загрузки кинотеатров:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  openEditDialog = cinema => {
    this.setState({ openEditDialog: true, editCinema: cinema });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editCinema: null });
  };

  editCinema(cinema) {
    this.OpenEditDialog(cinema);
  }

  configureSeats = (cinema) => {
    this.props.history.push(`/admin/cinemas/configure-seats/${cinema._id}`);
  };

  render() {
    const { classes, cinemas } = this.props;
    const { editCinema, search, isLoading } = this.state;
    const filteredCinemas = match(search, cinemas, 'name');
    
    return (
      <div className={classes.root}>
        <CinemaToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
          onAddClick={() => this.openEditDialog()}
        />
        <div className={classes.content}>
          {isLoading ? (
            <div className={classes.progressWrapper}>
            <CircularProgress />
            </div>
          ) : filteredCinemas.length === 0 ? (
            <div className={classes.progressWrapper}>
              <p>Кинотеатры не найдены</p>
            </div>
          ) : (
            <Grid container spacing={3}>
              {filteredCinemas.map(cinema => (
                <Grid
                  item
                  key={cinema._id}
                  lg={4}
                  md={6}
                  xs={12}>
                  <div className={classes.cinema}>
                    <div className={classes.cinemaImage}>
                      {cinema.image ? (
                        <img
                          src={cinema.image}
                          alt={cinema.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/cinema-placeholder.jpg';
                          }}
                        />
                      ) : (
                        <img src="/images/cinema-placeholder.jpg" alt={cinema.name} />
                      )}
                    </div>
                    <div className={classes.cinemaInfo}>
                      <h3>{cinema.name}</h3>
                      <p>Цена билета: {cinema.ticketPrice} ₽</p>
                      <p>Доступных мест: {cinema.seatsAvailable}</p>
                      <div className={classes.cinemaActions}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => this.openEditDialog(cinema)}
                          className={classes.actionButton}>
                          Редактировать
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => this.configureSeats(cinema)}
                          className={classes.actionButton}>
                          Настроить места
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <ResponsiveDialog
          id="Edit-cinema"
          open={this.state.openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          <AddCinema
            editCinema={editCinema}
            handleClose={() => this.CloseEditDialog()}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

CinemaList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ cinemaState }) => ({
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { getCinemas, removeCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CinemaList));
