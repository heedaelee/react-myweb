import React, { Component } from "react";

import { PageTemplate } from "components/common";
import { PostList, Card, Tag } from "components/main";

const Homepage = () => {
  return (
    <PageTemplate>
      <Card />
      <div
        style={{
          margin: "30px 0px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{ width: "75%" }}>
          <PostList />
          {/* pagination */}
        </div>
        <div style={{ width: "20%" }}>
          <Tag />
        </div>
      </div>
    </PageTemplate>
  );
};

export default Homepage;
