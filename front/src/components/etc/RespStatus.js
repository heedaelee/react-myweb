// @flow
import React from 'react';
import { Route } from 'react-router-dom';

const RespStatus = ({ code, children }) => {
  return (
    <Route
      // $FlowFixMe
      render={({ staticContext }) => {
        if (staticContext) {
          // $FlowFixMe
          staticContext.status = code;
        }
        return children;
      }}
    />
  );
};

export default RespStatus;
