import React from 'react';

class Small extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tool: (props.tool || ''),
    };
  }

  render() {
    return (
      <>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <input id="tool" type="text" />
          <input type="submit" value="Submit" />
        </form>
        <p id="output">Your child's state is: {this.props.tool}</p>
      </>
    );
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newTool = document.getElementById('tool').value;
    this.props.callback(newTool);
  };
}

export default Small;
