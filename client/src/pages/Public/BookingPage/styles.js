export default theme => ({
  root: {
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100vh'
  },
  container: { height: '100%' },
  movieInfos: {
    background: 'rgba(57, 61, 67, 0.5)',
    position: 'relative',
    height: '100%'
  },
  background: {
    position: 'absolute',
    opacity: 0.4,
    top: 0,
    height: '70%',
    right: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    zIndex: 1
  },
  title: {
    position: 'absolute',
    top: '60%',
    right: 0,
    width: '100%',
    textAlign: 'center',
    color: theme.palette.common.white,
    fontSize: '24px',
    textTransform: 'capitalize',
    zIndex: 2
  },
  info: {
    position: 'absolute',
    padding: theme.spacing(5),
    top: '70%',
    right: 0,
    width: '100%'
  },
  infoBox: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2)
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(120, 205, 4)'
    }
  },
  bookingBanner: {},
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: 'uppercase',
    color: 'rgb(93, 93, 97)',
    marginBottom: theme.spacing(1)
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  [theme.breakpoints.down('md')]: {
    root: { height: '100%' },
    movieInfos: { minHeight: '30vh' },
    background: { height: '60%' },
    title: { top: '50%' },
    info: { top: '60%', display: 'flex', justifyContent: 'center' },
    infoBox: {
      marginRight: theme.spacing(2)
    }
  },
  [theme.breakpoints.down('sm')]: {
    info: { display: 'none' },
    background: { height: '100%' },
    title: { top: '80%' },
    seat: { padding: theme.spacing(0.8), margin: theme.spacing(0.5) }
  }
});
