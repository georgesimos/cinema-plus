export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  cardsContainer: {
    padding: theme.spacing(2)
  },
  card: {
    marginBottom: theme.spacing(2)
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1)
  },
  total: {
    color: theme.palette.primary.main
  },
  cardContent: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  posterContainer: {
    width: 120,
    marginRight: theme.spacing(3)
  },
  poster: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.spacing(1)
  },
  infoContainer: {
    flex: 1,
    marginRight: theme.spacing(3)
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 150
  },
  qrCode: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2)
  },
  deleteButton: {
    width: '100%'
  },
  tableRow: {
    height: '64px'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: 'pointer'
  }
});
