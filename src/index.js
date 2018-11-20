import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import Home from './layouts/Home'
import User from './layouts/Users'
import Farm from './layouts/Farm'
import Bounties from './layouts/Bounties'
import { LoadingContainer } from 'drizzle-react-components'

import { history, store } from './store'
import drizzleOptions from './drizzleOptions'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history} store={store}>
          <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:address" component={User} />
          <Route exact path="/farm/:farmId" component={Farm} />
          <Route exact path="/bounties" component={Bounties} />
          </div>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
