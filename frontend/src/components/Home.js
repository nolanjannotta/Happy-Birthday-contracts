import React from 'react'
import {
    Link,
    useLocation
  } from "react-router-dom";

function Home(props) {
    console.log(window.location.pathname)
    // const location = useLocation()
    return (
        <div>
            <Link to="/gift"> gift</Link>)
            <Link to="/open"> open</Link>)


            
            
        </div>
    )
}

export default Home
