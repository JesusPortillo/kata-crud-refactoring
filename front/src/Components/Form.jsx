import React, {useState, useContext, useRef} from 'react'
import Store from '../Store/Store';

const HOST_API = "http://localhost:8080/api";

function Form({todoListId}) {
  
  const formRef = useRef(null);
  const { state: { todo, errorTodo }, dispatch } = useContext(Store);
  const item = todo.item;
  const error = errorTodo;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    if(state.name === undefined || state.name === ""){
      dispatch({ type: "update-errorTodo", error: { isError:true, id: todoListId }});
    } else{
      dispatch({ type: "update-errorTodo", error: { isError:false, id: null }});
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
  }

  const onEdit = (event) => {
    event.preventDefault();
    if(state.name === ""){
      dispatch({ type: "update-errorTodo", error: { isError:true, id: todoListId }});
    } else{
      dispatch({ type: "update-errorTodo", error: { isError:false, id: null }});
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
  }

  return <form className="form-inline" ref={formRef}>
    <div className="form-group">
      <input type="text" name="name" placeholder="¿Qué piensas hacer?" className={error && error.id === todoListId ? "is-invalid form-control form-control-sm": "form-control-sm"} defaultValue={ todoListId === item.todoListId ? item.name : null } onChange={(event) => {setState({ ...state, name: event.target.value })}}></input>
    </div>

    <button type="button"  className={todoListId === item.todoListId ? "btn btn-secondary btn-sm ml-2"  : "d-none"} onClick={onEdit}>Actualizar</button>
    <button type="button" className={todoListId !== item.todoListId ? "btn btn-success btn-sm ml-2" : "d-none"} onClick={onAdd}>Crear</button>
  </form>
}

export default Form
