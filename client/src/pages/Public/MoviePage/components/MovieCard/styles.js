export default theme => ({
  card: {
    display: 'flex',
    flex: ' 0 0 auto',
    flexDirection: 'column',
    width: '400px',
    boxShadow: `10px 5px 40px 20px ${theme.palette.background.dark}`,
    margin: '60px 30px'
  },
  header: {
    backgroundImage: 'url("https://source.unsplash.com/user/erondu/600x400")',
    backgroundSize: 'cover',
    height: '200px',
    padding: '5px 10px',
    width: '100%',
    color: theme.palette.common.white
  },
  body: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '15px',
    whiteSpace: 'normal'
  }
});
