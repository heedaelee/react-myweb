import React, {Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as postActions from 'store/modules/post';

import {Post} from 'components/post';

class PostContainer extends Component {


  render(){


    return(
      <Post />
    );
  }
}
