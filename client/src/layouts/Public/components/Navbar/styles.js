export default theme => ({
  root: {},
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1.25rem 20px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    transition: 'all 300ms linear',
    transform: 'translate3d(0,0,0)',
    backfaceVisibility: 'hidden',
    zIndex: 999
  },
  logoLink: {
    display: 'inline-block',
    paddingTop: '.15rem',
    paddingBottom: '.15rem',
    marginRight: '20px',
    fontSize: '1.5rem',
    lineHeight: 'inherit',
    whiteSpace: 'nowrap',
    textDecoration: 'none'
  },
  logo: {
    maxHeight: '2.4rem',
    width: 'auto',
    fontSize: '2rem',
    letterSpacing: '1px',
    color: theme.palette.common.white
  },
  navLinks: {
    display: 'flex'
  },
  navLink: {
    position: 'relative',
    color: theme.palette.common.white,
    padding: '0 .5rem',
    margin: '0 1rem',
    fontSize: '1.6rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    zIndex: 2,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-7px',
      left: 0,
      width: '100%',
      opacity: 0,
      height: 0,
      marginTop: '3px',
      backgroundColor: 'rgba(255,255,255,0.5)',
      transition: 'all 200ms linear',
      zIndex: 1
    },
    '&:hover:after': {
      opacity: 1,
      height: '10px'
    }
  },

  navBtn: {
    marginRight: '50px'
  },
  navIcon: {
    height: '30px',
    width: '30px',
    position: 'relative',
    zIndex: 2,
    cursor: 'pointer',
    '&:hover $navIconLine__left, &:hover $navIconLine__right': {
      width: '30px'
    }
  },
  navIconLine: {
    height: '2px',
    width: '30px',
    display: 'block',
    backgroundColor: theme.palette.common.white,
    marginBottom: '7px',
    transition: ' transform .2s ease, background-color .5s ease'
  },
  navIconLine__left: {
    width: '20px',
    transition: 'all 200ms linear'
  },
  navIconLine__right: {
    width: '20px',
    transition: 'all 200ms linear'
  },

  nav: {
    display: 'flex',
    position: 'fixed',
    flexWrap: 'wrap',
    paddingLeft: 0,
    marginBottom: 0,
    listStyle: 'none',
    '&:before, &:after': {
      content: '""',
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.1)',
      zIndex: '-1',
      transition: 'transform cubic-bezier(0.77, 0, 0.175, 1) 0.8s',
      transform: 'translateX(0%) translateY(-100%)'
    },
    '&:before': {
      background: theme.palette.background.dark,
      transitionDelay: '0s'
    },
    '&:after': {
      transitionDelay: '.1s'
    }
  },
  navActive: {
    visibility: 'visible',
    '&:before': {
      transitionDelay: '0s',
      transform: 'translateX(0%) translateY(0%)'
    },
    '&:after': {
      transitionDelay: '.1s',
      transform: 'translateX(0%) translateY(0%)'
    }
  }
});
