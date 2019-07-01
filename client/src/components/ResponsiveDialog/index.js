import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     margin: 'auto',
//     width: 'fit-content'
//   },
//   formControl: {
//     marginTop: theme.spacing(2),
//     minWidth: 120
//   },
//   formControlLabel: {
//     marginTop: theme.spacing(1)
//   }
// }));

const ResponsiveDialog = ({
  id,
  title,
  contentText,
  children,
  open,
  handleClose
}) => {
  // const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      aria-labelledby={id}>
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialog;
