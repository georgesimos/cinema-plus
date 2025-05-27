import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        <Link href="https://github.com/Whymeet/cinema-plus" target="_blank" rel="noopener">
          @https://github.com/Whymeet/cinema-plus
        </Link>
      </Typography>
    </div>
  );
}
