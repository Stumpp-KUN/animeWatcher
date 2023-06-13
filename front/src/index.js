import React from 'react';
import ReactDOM from 'react-dom';
import YourComponent from './head.jsx';
import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnimePage from './animePage.jsx';
import Animes from './animes.jsx';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={YourComponent} />
      <Route path="/anime/:id" component={AnimePage} />
      <Route path="/animes" component={Animes}/>
    </Switch>
  </Router>,
  rootElement
);
