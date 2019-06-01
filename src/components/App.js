import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Homepage,Editorpage} from 'pages';


class App extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/editor" component={Editorpage} /> 
        {/* 
        <Route exact path="/page/:page" component={Homepage} />
        <Route path="/posts/:id" component={Postpage} />
        
        */}
      </Switch>
    );
  }
}


export default App;
