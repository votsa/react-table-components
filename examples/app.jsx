import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapContainer from './components/bootstrap';

const App = () => (
  <div>
    <BootstrapContainer />
  </div>
);

ReactDOM.render(App(), document.getElementById('app'));
