import React from 'react';

class Tool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.tool
    };
  }

  render = () => {
    return (
      <div>
        <p>
          Learn {this.state.name}
        </p>
        <button type="button" onClick={this.changeState}>
          Change Tool
        </button>
      </div>
    );
  }

  changeState = () => {
    const newTool = (this.state.name !== 'vlang.io' ? 'vlang.io' : 'react.js');

    this.setState({name: newTool});
  }
}

export default Tool;
