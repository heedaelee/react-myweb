import React,{Component} from 'react';
import PropTypes from 'prop-types';

import {SideBar,Footer} from 'components/common';

//Material Styles
import { withStyles } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';

const styles = theme => ({
  width: 'auto',
  marginLeft: theme.spacing.unit * 3,
  marginRight: theme.spacing.unit * 3,
  [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
    width: 1100,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

class PageTemplate extends Component {
  render(){
    const {classes} = this.props;

    return(
      <div>
        <CssBaseLine />
        <div className={classes.layout}>
          <SideBar />
          <main>
            {this.props.children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

PageTemplate.propTypes = {
  classes:PropTypes.object.isRequired
};

export default withStyles(styles)(PageTemplate)