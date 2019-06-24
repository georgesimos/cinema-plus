export default theme => ({
  container: {
    minHeight: '100vh',
    color: theme.palette.common.white,
    backgroundColor: '#341cac'
  },
  fullHeight: {
    minHeight: '100vh'
  },
  title: {
    width: '50%',
    color: theme.palette.common.white
  },
  h2: {
    fontSize: '3rem',
    lineHeight: '3rem'
  },
  h4: {
    fontSize: '1rem'
  },
  body2: {
    paddingTop: '10px',
    fontSize: '1.2rem',
    lineHeight: '1.8rem'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    marginTop: 0,
    ' &::-webkit-scrollbar': {
      display: 'none'
    }
  }
});
