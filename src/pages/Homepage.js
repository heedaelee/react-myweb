import React, { Component } from "react";

import { PageTemplate } from "components/common";
import { PostList, Card, Tag } from "components/main";
import { Pagination } from 'components/list'
import { MainWrapper } from 'components/main'

const Homepage = () => {
  return (
    <PageTemplate>
      <MainWrapper 
        card={<Card />}
        postList = {<PostList />}
        pagination = {<Pagination />}
        tag= { <Tag /> }
      />
    </PageTemplate>
  );
};

export default Homepage;
