import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tool from './Tool';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: {
        name: 'React',
      },
    };
  }

  render() {
    const { tool } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Tool tool={tool || this.state.tool} />
        </header>
      </div>
    );
  }
}

export default App;
