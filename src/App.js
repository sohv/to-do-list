import React, { useState, useEffect, Fragment } from 'react';
import { getTodosAPI, postTodosAPI, patchTodosAPI } from './api/todos'
import TodoTable from './TodoTable'
import CreateToDo from './CreateToDo';
function App() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    getTodosAPI().then(todos => setTodos(todos))
  }, []);
  const addTodo = (todo) => {
    postTodosAPI(todo).then(data => {
      console.log("data saved:" + JSON.stringify(data))
      setTodos([...todos, data])
    }
    )
  }
  const updateTodo = (id, done) => {
    patchTodosAPI(id, (done) ? false : true).then(data => {
      if (data) {
        console.log('updating records!!')
        getTodosAPI().then(todos => setTodos(todos))
      }
    })
  }
  return (
    <Fragment>
      <main role="main" className="container">
        <CreateToDo onCreate={addTodo} />
        <TodoTable
          todos={todos}
          onUpdate={updateTodo} />
      </main>
    </Fragment>
  );
}
export default App;