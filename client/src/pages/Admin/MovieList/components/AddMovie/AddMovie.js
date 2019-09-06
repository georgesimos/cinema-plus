import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
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

// Component styles
import styles from './styles';

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
    endDate: new Date(),
    status: ''
  };

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

  onAddMovie = async () => {
    try {
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
      const token = localStorage.getItem('jwtToken');
      const body = {
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
      };
      debugger;
      const url = 'http://localhost:3001/movies/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        const movie = await response.json();
        console.log(movie);
        this.setState({
          status: 'success'
        });
      }
    } catch (error) {
      this.setState({
        error,
        status: 'fail'
      });
    }
  };

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
      endDate,
      status
    } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel subtitle="Add a new one" title="Movie" />
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
                className={classes.textField}
                label="Genre"
                margin="dense"
                required
                value={genre}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('genre', event.target.value)
                }
              />
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
                className={classes.textField}
                label="Language"
                margin="dense"
                required
                value={language}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('language', event.target.value)
                }
              />
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
          <Button color="primary" variant="contained" onClick={this.onAddMovie}>
            Save details
          </Button>
          {status ? (
            status === 'success' ? (
              <Typography
                className={classes.infoMessage}
                color="primary"
                variant="caption">
                Movie have been saved!
              </Typography>
            ) : (
              <Typography
                className={classes.infoMessage}
                color="error"
                variant="caption">
                Movie have not been saved, try again.
              </Typography>
            )
          ) : null}
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

export default withStyles(styles)(AddMovie);
