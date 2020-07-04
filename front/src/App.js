import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './container/Registro';
import Dashboard from './container/Dashboard';
import Historial from './container/Historial';
import Curriculum from './container/Curriculum';

function App() {
  return (
    <div>
      <Curriculum />
    </div>
  );
}

export default App;
