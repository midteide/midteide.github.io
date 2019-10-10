import React, {Component} from 'react'
//import Button from 'react-bootstrap/Button';
//import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
//import Navbar from 'react-bootstrap/Navbar'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Pages
import {Home} from './Home'
import {About} from './About'
import {Contact} from './Contact'
import {Calculator} from './Calculator'
import {MemePage} from './MemePage'
import {MoistureSensor} from './MoistureSensor'
import {CabinControl} from './CabinControl'
import {Chessclock} from './Chessclock'
import {NoMatch} from './NoMatch'


import {Layout} from './components/Layout'
import { NavigationBar} from './components/NavigationBar'
import { Jumbotron } from './components/Jumbotron'

import Row from 'react-bootstrap/Row'




//import './App.css';

class App extends Component {
  componentDidMount() {
    document.title = "Alexander Midteide's portfolio..."
  }
  render(){
    return (
      // <React.Fragment>
      <div class="container">
        <NavigationBar />
        <Jumbotron />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route exact path="/calculator" component={Calculator} />
              <Route path="/memepage" component={MemePage} />
              <Route path="/MoistureSensor" component={MoistureSensor} />
              <Route path="/CabinControl" component={CabinControl} />
              <Route path="/chessclock" component={Chessclock} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </div>

      // </React.Fragment>
      
    );
  }
}

export default App;
