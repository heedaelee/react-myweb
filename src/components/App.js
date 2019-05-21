import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Homepage} from 'pages';


class App extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Homepage} />
        {/* 
        <Route exact path="/page/:page" component={Homepage} />
        <Route path="/posts/:id" component={Postpage} />
        <Route path="/editor" component={Editorpage} /> 
        */}
      </Switch>
    );
  }
}


export default App;
