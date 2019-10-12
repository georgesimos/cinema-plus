export default theme => ({
  card: {
    display: 'flex',
    flex: ' 0 0 auto',
    flexDirection: 'column',
    width: 400,
    height: 400,
    boxShadow: `10px 5px 40px 20px ${theme.palette.background.dark}`,
    margin: '60px 30px'
  },
  header: {
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80%',
    padding: '5px 10px',
    width: '100%',
    color: theme.palette.common.white
  },
  body: {
    height: '20%',
    color: theme.palette.common.white,
    padding: '15px',
    whiteSpace: 'normal'
  }
});
