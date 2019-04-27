import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import dotenv from 'dotenv'

import './styles/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

dotenv.config()

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ),
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

async function checkSWQueue() {
    const msgKun = new MessageChannel()
    msgKun.port1.onmessage = ({ data }) => {
        if (data.error) {
            console.log('Oh no!')
            console.error(data.error)
        } else {
            console.log('SW says:')
            console.log(data)
        }
    }
    navigator.serviceWorker.controller.postMessage('Hey dude just check the queue, ok? thnks bye.', [msgKun.port2])
}

window.addEventListener('online', checkSWQueue)
