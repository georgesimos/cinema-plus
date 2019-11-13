import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getCinemas } from '../../../store/actions';
import CinemaCard from '../components/CinemaCard/CinemaCard';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function CinemasPage(props) {
  const classes = useStyles(props);
  const { cinemas, getCinemas } = props;
  useEffect(() => {
    if (!cinemas.length) getCinemas();
  }, [cinemas, getCinemas]);

  return (
    <Container maxWidth="xl">
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
          alignItems="center"
          justify="flex-start"
          spacing={2}>
          {cinemas.map(cinema => (
            <Grid key={cinema._id} item xs={12} md={4} lg={3}>
              <CinemaCard cinema={cinema} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ cinemaState }) => ({
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { getCinemas };

export default connect(mapStateToProps, mapDispatchToProps)(CinemasPage);
