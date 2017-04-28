import * as React from 'react';
const ReactTable = require('react-table').default;

import './App.css';
import 'react-table/react-table.css';

const logo = require('./logo.svg');

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {};
    this.state.data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    },
    {
      name: 'John Malcom',
      age: 16,
      friend: {
        name: 'Patty Kevler',
        age: 33,
      }
    }
    ];
    this.state.columns = [{
      header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      header: 'Age',
      accessor: 'age',
      render: (props: any) => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      header: 'Friend Name',
      accessor: (d: any) => d.friend.name // Custom value accessors!
    }, {
      header: (props: any) => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }];
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default App;
