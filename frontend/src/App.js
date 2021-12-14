import logo from './logo.svg';
import { useState } from "react"
import './App.css';
import useContract from './hooks/useContract';
import Gift from "./components/Gift"
import Open from "./components/Open"
import Home from "./components/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import About from "./components/About"
import Thanks from "./components/Thanks"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";




function App() {

  // console.log(location)


  return (
    <div className="background">
      <div className="App">

      

        <Router>
          <Header>

          </Header>



          

          <Switch>
          
          <Route path="/gift">
            <Gift />
          </Route>
          <Route path="/open">
            <Open />
            </Route>
            <Route path="/about">
            <About />
            </Route>
            <Route path="/">
              <Home />
              
          </Route>
          </Switch>
          
        </Router>

      </div>
      <Footer>
        
      </Footer>

      
    </div>
    
  );
}

export default App;
