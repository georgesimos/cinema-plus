import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../../components';
import styles from './styles';
import { genreData, languageData } from '../../../../../data/MovieDataService';
import {
  addMovie,
  updateMovie,
  removeMovie
} from '../../../../../store/actions';

class AddMovie extends Component {
  state = {
    title: '',
    image: '',
    genre: '',
    language: '',
    duration: '',
    description: '',
    director: '',
    cast: '',
    releaseDate: new Date(),
    endDate: new Date()
  };

  componentDidMount() {
    if (this.props.edit) {
      const {
        title,
        image,
        language,
        genre,
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate
      } = this.props.edit;
      this.setState({
        title,
        image,
        language,
        genre,
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movie !== this.props.movie) {
      const { title, genre, language } = this.props.movie;
      this.setState({ title, genre, language });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddMovie = () => this.props.addMovie(this.state);

  onUpdateMovie = () => {
    const {
      title,
      image,
      language,
      genre,
      director,
      cast,
      description,
      duration,
      releaseDate,
      endDate
    } = this.state;
    this.props.updateMovie(this.props.edit._id, {
      title,
      image,
      language,
      genre,
      director,
      cast,
      description,
      duration,
      releaseDate,
      endDate
    });
  };

  onRemoveMovie = () => this.props.removeMovie(this.props.edit._id);

  render() {
    const { movie, classes, className, ...rest } = this.props;
    const {
      title,
      image,
      genre,
      language,
      duration,
      description,
      director,
      cast,
      releaseDate,
      endDate
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = this.props.edit ? 'Edit Movie' : 'Add Movie';
    const submitButton = this.props.edit ? 'Update Movie' : 'Save Details';
    const submitAction = this.props.edit
      ? () => this.onUpdateMovie()
      : () => this.onAddMovie();

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel subtitle={subtitle} title="Movie" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the title"
                label="Title"
                margin="dense"
                required
                value={title}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('title', event.target.value)
                }
              />

              <TextField
                select
                className={classes.textField}
                label="Genre"
                margin="dense"
                required
                value={genre}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('genre', event.target.value)
                }>
                {genreData.map((genreItem, index) => (
                  <MenuItem key={genreItem + '-' + index} value={genreItem}>
                    {genreItem}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Image Url"
                margin="dense"
                required
                value={image}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('image', event.target.value)
                }
              />
              <TextField
                fullWidth
                className={classes.textField}
                label="Description"
                margin="dense"
                required
                variant="outlined"
                value={description}
                onChange={event =>
                  this.handleFieldChange('description', event.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <TextField
                select
                className={classes.textField}
                label="Language"
                margin="dense"
                required
                value={language}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('language', event.target.value)
                }>
                {languageData.map(langItem => (
                  <MenuItem value={langItem}>{langItem}</MenuItem>
                ))}
              </TextField>

              <TextField
                className={classes.textField}
                label="Duration"
                margin="dense"
                type="number"
                value={duration}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('duration', event.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Director"
                margin="dense"
                required
                value={director}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('director', event.target.value)
                }
              />
              <TextField
                className={classes.textField}
                label="Cast"
                margin="dense"
                required
                value={cast}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('cast', event.target.value)
                }
              />
            </div>
            <Grid container className={classes.grid} justify="space-around">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="release-date"
                  label="Release Date"
                  value={releaseDate}
                  onChange={date =>
                    this.handleFieldChange('releaseDate', date._d)
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="end-date"
                  label="End Date"
                  value={endDate}
                  onChange={date => this.handleFieldChange('endDate', date._d)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            className={classes.buttonFooter}
            color="primary"
            variant="contained"
            onClick={submitAction}>
            {submitButton}
          </Button>
          {this.props.edit && (
            <Button
              className={classes.buttonFooter}
              color="dafault"
              variant="contained"
              onClick={this.onRemoveMovie}>
              Delete Movie
            </Button>
          )}
        </PortletFooter>
      </Portlet>
    );
  }
}

AddMovie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing
});

const mapDispatchToProps = { addMovie, updateMovie, removeMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddMovie));
