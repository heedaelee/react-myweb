import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CallBack from 'containers/etc/CallBack';
import { 
  Homepage, 
  Editorpage, 
  Postpage, 
  Auth,
  Profilepage 
} from "pages";
import NotFoundpage from "components/notFoundPage/NotFoundpage";

import Base from "containers/common/Base";


class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/page/:page" component={Homepage} />
          <Route exact path="/tag/:tag/:page?" component={Homepage} />
          {/* page default = 1 설정됨 */}
          <Route path="/post/:id" component={Postpage} />
          <Route path="/editor" component={Editorpage} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profilepage} />
          <Route path="/callback" component={CallBack} />
          <Route component={NotFoundpage} />
        </Switch>
        <Base />
      </div>
    );
  }
}

export default App