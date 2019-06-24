export default theme => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "space-between"
  },
  deleteButton: {
    color: theme.palette.danger.main,
    marginRight: theme.spacing.unit
  },
  searchInput: {
    marginRight: theme.spacing.unit
  }
});
