export default theme => ({
  container: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.dark
  },
  fullHeight: {
    height: '100vh'
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
    cursor: 'grab',
    touchAction: 'pan-y',
    userSelect: 'none',
    ' &::-webkit-scrollbar': {
      display: 'none'
    }
  },
  [theme.breakpoints.down('sm')]: {
    title: { width: '100%', textAlign: 'center' },
    fullHeight: { height: '100%', paddingTop: theme.spacing(20) }
  }
});
