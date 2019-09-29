export default theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  nameText: {
    marginTop: theme.spacing(2)
  },
  bioText: {},
  profileDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.default.light,
      borderLeft: `4px solid ${theme.palette.default.dark}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        // color: theme.palette.default.dark,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.default.dark}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.default.light,
    '& $listItemText': {
      color: theme.palette.text.primary
    },
    '& $listItemIcon': {
      // color: theme.palette.default.dark,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  'Mui-selected': {
    display: 'none'
  },
  collapseContainer: { marginTop: theme.spacing(2) },
  nestedItem: {
    cursor: 'pointer',
    paddingLeft: theme.spacing(4),
    position: 'relative',
    paddingTop: '3px',
    paddingBottom: 0,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0px',
      left: '20px',
      display: 'block',
      height: ' 100%',
      width: '2px',
      background: '#eee'
    },
    '&:hover:before': {
      background: theme.palette.default.dark
    }
  },
  activeNestedItem: {
    '&:before': {
      background: theme.palette.default.dark
    }
  }
});
