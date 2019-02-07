import React from 'react'
import { Switch, Route } from 'react-router'

const Header = () => (
    <header id="header">
        <Switch>
            <Route path="/"><h1>Money.io</h1></Route>
            <nav id="nav">
                <ul>
                    <li><Route path="/">Signup</Route></li>
                    <li><Route path="#">Expore</Route></li>
                    <li><Route path="#">Submit</Route></li>
                </ul>
            </nav>
        </Switch>
    </header>
)

export default Header
