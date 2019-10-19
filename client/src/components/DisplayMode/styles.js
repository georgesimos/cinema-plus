export default theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: '5px',
    display: 'inline-flex',
    border: `1px solid ${theme.palette.border}`
  },
  option: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  optionSelected: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  },
  divider: {
    width: '1px',
    backgroundColor: theme.palette.divider
  }
});
