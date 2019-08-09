import React, { Component } from "react";

import { PageTemplate } from "components/common";
import { Tag } from "components/main";
import ListContainer from "containers/list/ListContainer";
import { MainWrapper } from "components/main";

const Homepage = ({ match }) => {
  //page의 default 를 1로,
  const { page = 1, tag } = match.params;

  return (
    <PageTemplate>
      <MainWrapper
        //card={<Card />} 나중에 혹시 캐러셀 달거나 할때..
        ListContainer={<ListContainer page={parseInt(page, 10)} tag={tag} />}
        tag={<Tag />}
      />
    </PageTemplate>
  );
};

export default Homepage;
