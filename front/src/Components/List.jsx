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

  const decorationDone = {
    textDecoration: 'line-through'
  };

  return <div className="mt-3">
    <table className="table table-striped ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tarea</th>
            <th>¿Completado?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todo, index) => {
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
              <td className="align-middle">{todo.id}</td>
              <td className="align-middle">{todo.name}</td>
              <td className="align-items-center">
                <input type="checkbox" className="align-middle" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input>
              </td>
              <td className="text-center">
                <button type="button" onClick={() => onDelete(todo.id)} className="btn btn-danger btn-sm">Eliminar</button>
                <button disabled={todo.completed} onClick={() => onEdit(todo)} type="button" className="btn btn-info btn-sm ml-1">Editar</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
      <div className={currentList.length === 0 ? "": "d-none"}>No se han creado tareas aún.</div>
  </div>
}

export default List
