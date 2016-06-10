import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './src/app'

// Global Styles
import './assets/styles/bootstrap.css'
import './assets/styles/index.less'
import './assets/styles/weather-icons.css'
import './assets/styles/weather-icons-wind.css'

// Components
import WeatherPage from './src/components/weather.js';
import Page2 from './src/components/page2.js';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/weather" component={WeatherPage}/>
      <Route path="/page2" component={Page2}/>
    </Route>
  </Router>
), document.getElementById('app'));
