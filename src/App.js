import React from 'react';
import Add from './Add';
import Checkbox from './Checkbox';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          name: 'Add some TODOs',
          done: false,
        },
      ],
    };
  }

  render() {
    return (
      <>
        <Add callback={this.addTodo} />
        {this.state.todos.map(todo => {
          return (
            <>
              <Checkbox name={todo.name} checked={todo.done} callback={this.toggleTodo} />
              <p>{todo.done ? 'true' : 'false'}</p>
              <br />
            </>
          )
        })}
      </>
    );
  }

  /* State Modifiers */

  addTodo = newTodo => {
    this.setState(prevState => prevState.todos.push(newTodo));
  }

  removeTodo = obsoleteTodo => {
    this.setState(prevState => {
      prevState.todos = prevState.todos.filter(todo => {
        return todo.name !== obsoleteTodo.name;
      });
      return prevState.todos;
    });
  }

  toggleTodo = updatedTodo => {
    this.setState(prevState => {
      const index = prevState.todos.findIndex(todo => {
        return todo.name === updatedTodo.name;
      });
      prevState.todos.splice(index, 1, updatedTodo);
      return prevState.todos;
    });
  }

  filterTodos = done => {
    return this.state.todos.filter(todo => {
      return done ? todo.done : !todo.done;
    });
  }
}

export default App;
