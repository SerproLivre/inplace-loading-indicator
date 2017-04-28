import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

import '../assets/react-toolbox/theme.css';
const theme = require('../assets/react-toolbox/theme.js');

import Button from 'react-toolbox/lib/button/Button';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import { CardExample } from './CardExample';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Preact</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button label="Test Button" raised primary />
        <CardExample/>

        </div>
      </ThemeProvider>
    );
  }
}

export default App;
