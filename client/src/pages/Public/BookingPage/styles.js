export default theme => ({
  root: {
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100vh'
  },
  container: { height: '100%' },

  [theme.breakpoints.down('md')]: {
    root: { height: '100%' }
  }
});
