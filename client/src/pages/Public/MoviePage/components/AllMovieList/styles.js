export default theme => ({
  container: {
    minHeight: '100vh',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.dark
  },
  fullHeight: {
    minHeight: '100vh'
  },
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    marginBottom: theme.spacing(3)
  },

  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
});
