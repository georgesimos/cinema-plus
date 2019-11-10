export default theme => ({
  container: { height: '100%', paddingTop: theme.spacing(10) },
  [theme.breakpoints.down('md')]: {
    root: { height: '100%' }
  }
});
