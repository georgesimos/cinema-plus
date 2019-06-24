export default theme => ({
  root: {},
  navbar: {
    position: 'relative',
    padding: '1.25rem 20px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff'
  },
  logoLink: {
    display: 'inline-block',
    paddingTop: '.15rem',
    paddingBottom: '.15rem',
    marginRight: '20px',
    fontSize: '1.5rem',
    lineHeight: 'inherit',
    whiteSpace: 'nowrap'
  },
  logoImage: {
    maxHeight: '2.4rem',
    width: 'auto'
  },
  navLinks: {
    display: 'flex'
  },
  navLink: {
    color: '#506690',
    padding: '0 1.5rem',
    fontSize: '1rem',
    fontWeight: '400',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#335eea'
    }
  }
});
