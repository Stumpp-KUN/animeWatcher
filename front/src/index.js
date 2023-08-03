import React from 'react';
import ReactDOM from 'react-dom';
import YourComponent from './head.jsx';
import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnimePage from './animePage.jsx';
import Animes from './animes.jsx';
import States from './states.jsx';
import Contact from './contacts.jsx';
import UserProfile from './userProfile.jsx';
import NewsComponent from './mainPage.jsx';
import UserAgreement from './UserAgreement.jsx';
import Copyright from './copyright.jsx';
import Privacy from './privacy.jsx';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={NewsComponent} />
      <Route path="/anime/:id" component={AnimePage} />
      <Route path="/animes" component={Animes}/>
      <Route path="/states" component={States}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/profile/:userId" component={UserProfile} />
      <Route path="/userAgreement" component={UserAgreement}/>
      <Route path="/copyright" component={Copyright}/>
      <Route path="/privacy" component={Privacy}/>
    </Switch>
  </Router>,
  rootElement
);
