import React, {useState, useContext, useRef} from 'react'
import Store from '../Store/Store';

const HOST_API = "http://localhost:8080/api";

function Form({todoListId}) {
  
  const formRef = useRef(null);
  const { state: { todo}, dispatch } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();
      const request = {
        name: state.name,
        id: null,
        completed: false,
        todoListId: todoListId
      };
  
      fetch(HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    
  }

  const onEdit = (event) => {
    event.preventDefault();
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted,
        todoListId: todoListId
      };
  
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    
  }

  return <form className="form-todo" ref={formRef}>
    <div>
      <input type="text" name="name" placeholder="Escribe una tarea aquí"  defaultValue={ todoListId === item.todoListId ? item.name : null } onChange={(event) => {setState({ ...state, name: event.target.value })}}></input>
    </div>
    <button className="update-todo-button" type="button" onClick={onEdit}>Actualizar</button>
    <button className="create-todo-button" type="button" onClick={onAdd}>Crear</button>
  </form>
}

export default Form
