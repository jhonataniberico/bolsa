import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './container/Registro';
import Dashboard from './container/Dashboard';
import Historial from './container/Historial';
import Curriculum from './container/Curriculum';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Router>
    <div>
      <Navegador />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/Historial" component={Historial} />
        <Route path="/Registro" component={Registro} />
        <Route path="/Curriculum" component={Curriculum} />
      </Switch>
    </div>
    </Router>
  );
}

const Navegador = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Bolsa de trabajo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="Historial">Historial</Nav.Link>
          <Nav.Link href="Curriculum">Curriculum</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link eventKey={2} href="Registro">
              Logout
          </Nav.Link>
          </Nav>
      </Navbar.Collapse>
  </Navbar>
);

const Home = () => (
  <div>
  </div>
);

export default App;
