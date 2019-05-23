import React from 'react';
import PropTypes from 'prop-types';

//Material Styles
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from "@material-ui/core/Drawer";

const styles= theme =>({
  RightDrawer:{
    backgroundColor : theme.palette.background.paper,
    border:'1px solid black',
    padding: `${theme.spacing.unit * 1}px 0`
  }
});

const RightDrawer = (props) => {
  const {classes} =props;

  return(
    <Drawer className={classes.RightDrawer}>
      <Typography 
        component="p" 
        variant="subtitle1"
        align="center"
        color="textSecondary"
      >
        my company
      </Typography>
    </Drawer>
  );
}

RightDrawer.propTypes = {
  classes:PropTypes.object.isRequired
};

export default withStyles(styles)(RightDrawer);