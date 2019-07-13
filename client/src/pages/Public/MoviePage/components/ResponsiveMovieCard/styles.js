export default theme => ({
  movieCard: {
    position: 'relative',
    height: 350,
    width: 800,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 10,
    transition: 'all 0.4s',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'all 0.4s'
    }
  },
  infoSection: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundBlendMode: 'multiply',
    background: 'linear-gradient(to right, #0d0d0c 50%, transparent 100%)',
    zIndex: 2,
    borderRadius: 10
  },
  movieHeader: {
    position: 'relative',
    padding: theme.spacing(3),
    height: '40%',
    width: '60%'
  },
  imageHeader: {
    position: 'relative',
    float: 'left',
    marginRight: theme.spacing(2),
    height: 125,
    maxWidth: 150,
    boxShadow: '0 0 20px -10px rgba(0,0,0,0.5)'
  },
  movieTitle: { fontWeight: 400 },
  director: {
    color: '#9ac7fa',
    fontWeight: '500',
    fontSize: '16px',
    marginTop: theme.spacing(1)
  },
  duration: {
    display: 'inline-block',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    border: '1px solid rgba(255,255,255,0.13)'
  },
  genre: {
    display: 'inline-block',
    color: '#cee4fd',
    marginLeft: theme.spacing(2)
  },
  description: {
    padding: theme.spacing(3),
    height: '50%',
    width: '50%'
  },
  descriptionText: {
    color: '#cfd6e1'
  },
  footer: {
    height: '10%',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(3)
  },
  icons: {
    display: 'inline-block',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.4)',
    margin: theme.spacing(0, 1),
    transition: 'all 0.3s',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.8)',
      transform: 'scale(1.25)',
      transition: 'all 0.3s',
      transitionDelay: '0.15s'
    }
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    height: '100%',
    right: 0,
    backgroundSize: 'cover !important',
    borderRadius: 11,
    width: '80%',
    backgroundPosition: '-100% 10% !important'
  },

  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' },
    movieCard: {
      width: '90%',
      margin: '0 auto',
      height: 'auto'
    },
    blurBackground: {
      width: '100%',
      backgroundPosition: '50% 50% !important'
    },
    movieHeader: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    description: {
      width: '100%'
    },
    infoSection: {
      background:
        'linear-gradient(to top, rgb(20, 20, 19) 50%, transparent 100%)',
      zIndex: 2,
      borderRadius: 10
    }
  }
});
