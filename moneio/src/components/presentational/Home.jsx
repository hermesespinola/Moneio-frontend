import React, { useEffect } from 'react'
import HomeBanner from './HomeBanner'

const Home = () => {
    useEffect(() => {
        window.location = "home.html"
    })
    return <HomeBanner />
}

export default Home
