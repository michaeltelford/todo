import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: 'React',
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const newTool = document.getElementById('tool').value;

    this.setState({
      tool: newTool,
    });
  }

  render() {
    return (
      <>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <input id="tool" type="text" />
          <input type="submit" value="Submit" />
        </form>
        <p id="output">Your chosen tool is {this.state.tool}</p>
      </>
    )
  }
}

export default App;
