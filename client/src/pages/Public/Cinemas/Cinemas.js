import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import { getCinemas } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  },
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function addPageCursors() {
  let cursor1, cursor2, cursor3;
  cursor1 = document.getElementById('cursor');
  cursor2 = document.getElementById('cursor2');
  cursor3 = document.getElementById('cursor3');
  //Page cursors
  document
    .getElementsByTagName('body')[0]
    .addEventListener('mousemove', function(event) {
      cursor1.style.left = event.clientX + 'px';
      cursor1.style.top = event.clientY + 'px';
      cursor2.style.left = event.clientX + 'px';
      cursor2.style.top = event.clientY + 'px';
      cursor3.style.left = event.clientX + 'px';
      cursor3.style.top = event.clientY + 'px';
    });
}

function Cinemas(props) {
  const classes = useStyles(props);
  const { cinemas, getCinemas } = props;
  useEffect(() => {
    getCinemas();
    addPageCursors();
  }, [getCinemas]);

  return (
    <Fragment>
      <div className={classes.root}>
        <Navbar />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              Our Cinemas
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="column"
            alignItems="center"
            justify="center"
            spacing={2}>
            {cinemas.map(cinema => (
              <Grid key={cinema._id} item>
                id: {cinema._id} <br />
                name: {cinema.name}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
      <div className="cursor" id="cursor" />
      <div className="cursor2" id="cursor2" />
      <div className="cursor3" id="cursor3" />
    </Fragment>
  );
}

Cinemas.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ cinemasState }) => ({
  cinemas: cinemasState.cinemas
});

const mapDispatchToProps = { getCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cinemas);
