import React from 'react';
import Add from './Add';
import CheckboxGroup from './CheckboxGroup';

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
        <h1>TODO Checklist</h1>
        <Add callback={this.addTodo} />
        <hr />
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
    if (newTodo.name === '') {
      alert('TODO item must have a name');
      return;
    }

    this.setState(prevState => {
      if (this.getTodo(newTodo, prevState)) {
        alert('TODO item already exists');
      } else {
        prevState.todos.push(newTodo);
      }

      return prevState;
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

      return prevState;
    });
  }

  filterTodos = done => {
    return this.state.todos.filter(todo => {
      return done ? todo.done : !todo.done;
    });
  }

  getTodo = (todo, prevState) => {
    const state = prevState || this.state;
    return state.todos.find(el => el.name === todo.name);
  }
}

export default App;
