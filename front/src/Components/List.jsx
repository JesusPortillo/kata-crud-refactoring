import React, {useContext, useEffect} from 'react'
import Store from '../Store/Store';

const HOST_API = "http://localhost:8080/api";
function List({todoListId}) {
  
  const { state: { todo }, dispatch } = useContext(Store);
  const currentList = todo.list.filter((item) => item.todoListId === todoListId );
  
  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [dispatch]);

  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-item", id })
    })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked,
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
      });
  };
  

  return <div className = "mt-3">
    <table className = "styled-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tarea</th>
            <th>¿Completado?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todo) => {
            
            return <tr key={todo.id} >
              <td>{todo.id}</td>
              <td className={todo.completed? "name-active":"name-deactive"}>{todo.name}</td>
              <td>
                <input type="checkbox" className="check" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input>
              </td>
              <td>
                <button type="button" onClick={() => onDelete(todo.id)} className="delete-button">Eliminar</button>
                <button disabled={todo.completed} onClick={() => onEdit(todo)} type="button" className="edit-button">Editar</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
  </div>
}

export default List
