export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  cinemas: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing(3)
  },
  cinema: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  cinemaImage: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  cinemaInfo: {
    padding: theme.spacing(2),
    '& h3': {
      margin: 0,
      marginBottom: theme.spacing(1),
      fontSize: '1.2rem'
    },
    '& p': {
      margin: 0,
      marginBottom: theme.spacing(0.5),
      color: theme.palette.text.secondary
    }
  },
  cinemaActions: {
    display: 'flex',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  actionButton: {
    flex: 1
  },
  content: {
    marginTop: theme.spacing(2)
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  pagination: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
