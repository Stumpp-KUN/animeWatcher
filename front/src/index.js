import React from 'react';
import ReactDOM from 'react-dom';
import YourComponent from './head.jsx';
import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnimePage from './animePage.jsx';
import Animes from './animes.jsx';
import States from './states.jsx';
import User from './userPage.jsx';
import Contact from './contacts.jsx';
import Receive from './receive.jsx';
import UserProfile from './userProfile.jsx';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={YourComponent} />
      <Route path="/anime/:id" component={AnimePage} />
      <Route path="/animes" component={Animes}/>
      <Route path="/states" component={States}/>
      <Route path="/users" component={User}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/receives" component={Receive}/> 
      <Route path="/profile/:userId" component={UserProfile} />
    </Switch>
  </Router>,
  rootElement
);
