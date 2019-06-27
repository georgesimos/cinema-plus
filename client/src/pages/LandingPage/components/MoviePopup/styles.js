export default theme => ({
  popup: {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999
  },
  content: {
    width: '75%',
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 2rem 4rem rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important'
  }
});
