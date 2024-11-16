import React from 'react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => (
  <Router>
    <Login />
  </Router>
);

export default App;