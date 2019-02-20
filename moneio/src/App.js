import React, { Component } from 'react'
import { Route, Switch } from 'react-router';
import Home from './components/presentational/Home'
import Header from './components/presentational/Header'
import Submit from './components/container/Submit'
import Explore from './components/presentational/Explore'
import BillEntries from './components/container/BillEntries'
import './styles/App.css'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/submit" component={Submit} />
          <Route exact path="/explore" component={Explore} />
          <Route path="/entries/:serialCode" component={BillEntries} />
        </Switch>
      </>
    )
  }
}

export default App
