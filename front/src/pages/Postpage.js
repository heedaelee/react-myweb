import React from 'react';
import {PageTemplate} from 'components/common';
import PostContainer from 'containers/post/PostContainer';

const Postpage = ({match}) => {

  const {id} = match.params;

  return (
    <PageTemplate>
      <PostContainer id={id} />
    </PageTemplate>
  );
};

export default Postpage;