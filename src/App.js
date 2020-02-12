import React from 'react';
import Add from './Add';
import CheckboxGroup from './CheckboxGroup';
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
        <CheckboxGroup
          todos={this.filterTodos(false)}
          toggleCallback={this.updateTodo}
          removeCallback={this.removeTodo} />
        <hr />
        <CheckboxGroup
          todos={this.filterTodos(true)}
          toggleCallback={this.updateTodo}
          removeCallback={this.removeTodo} />
      </>
    );
  }

  /* State Modifiers */

  addTodo = newTodo => {
    this.setState(prevState => {
      prevState.todos.push(newTodo);

      return {
        todos: prevState.todos,
      }
    });
  }

  removeTodo = obsoleteTodo => {
    this.setState(prevState => {
      const filteredTodos = prevState.todos.filter(todo => {
        return todo.name !== obsoleteTodo.name;
      });

      return {
        todos: filteredTodos,
      }
    });
  }

  updateTodo = updatedTodo => {
    this.setState(prevState => {
      const index = prevState.todos.findIndex(todo => {
        return todo.name === updatedTodo.name;
      });
      prevState.todos.splice(index, 1, updatedTodo);

      return {
        todos: prevState.todos,
      }
    });
  }

  filterTodos = done => {
    return this.state.todos.filter(todo => {
      return done ? todo.done : !todo.done;
    });
  }
}

export default App;
