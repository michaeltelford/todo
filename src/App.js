import React from 'react';
import './App.css';
import Small from './Small';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: 'React',
    };
  }

  render() {
    return (
      <>
        <Small tool={this.state.tool} callback={this.updateTool} />
        <p>The parent's state is: {this.state.tool}</p>
      </>
    )
  }

  updateTool = (newTool) => {
    this.setState({
      tool: newTool,
    });
  }
}

export default App;
