import React, { Component } from 'react'
import { Route, Switch } from 'react-router';
import Home from './components/presentational/Home'
import Header from './components/presentational/Header'
import Submit from './components/presentational/Submit'
import './styles/App.css'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/submit" component={Submit} />
        </Switch>
      </>
    )
  }
}

export default App
