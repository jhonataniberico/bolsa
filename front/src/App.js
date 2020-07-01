import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './container/Registro';
import Dashboard from './container/Dashboard';
import Historial from './container/Historial';

function App() {
  return (
    <div>
      <Historial />
    </div>
  );
}

export default App;
