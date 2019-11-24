export default theme => ({
  root: {},
  title: { marginLeft: theme.spacing(3) },
  field: {
    margin: theme.spacing(3),
    display: 'flex'
  },
  textField: {
    textTransform: 'capitalize',
    width: '100%',
    marginRight: theme.spacing(3)
  },
  upload: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  portletFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  buttonFooter: {
    margin: theme.spacing(3)
  },
  infoMessage: {
    marginLeft: theme.spacing(3)
  }
});
