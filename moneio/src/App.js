import React, { Component } from 'react'
import { Route, Switch } from 'react-router';
import Home from './components/presentational/Home'
import Header from './components/presentational/Header'
import Submit from './components/container/Submit'
import BillEntries from './components/container/BillEntries'
import './styles/App.css'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div style={{
          justifyContent: 'center',
          maxWidth: '1280px',
          width: '80vw',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/submit" component={Submit} />
            <Route exact path="/explore" component={BillEntries} />
            <Route path="/explore/:serialCode" component={BillEntries} />
          </Switch>
        </div>
      </>
    )
  }
}

export default App
