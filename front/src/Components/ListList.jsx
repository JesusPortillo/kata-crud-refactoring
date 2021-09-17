import React, {useContext, useEffect} from 'react'
import Store from '../Store/Store';
import Form from './Form';
import List from './List';

const HOST_API = "http://localhost:8080/api";

function ListList() {

  const { state: { todoList }, dispatch } = useContext(Store);
  const currentList = todoList.list;

  useEffect(() => {
    fetch(HOST_API + "/listsOfTodo")
      .then((response) => response.json())
      .then((list) => {
        dispatch({ type: "update-list-todoList", list });
      });
  }, [dispatch]);

  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/deleteTodoList", {
      method: "DELETE",
    }).then((todoList) => {
      dispatch({ type: "delete-todoList", id });
    });
  };

  return (
    <div className = "principal-container">
        {currentList.map((todoList, index) => {
          return (
            <div className="p-3 my-3 border"  key={todoList.id}>
              <div className="d-flex justify-content-between mb-4">
                <h4>{ todoList.name ? todoList.name.toUpperCase() : ""}</h4>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDelete(todoList.id)}>Eliminar</button>
              </div>
              <Form todoListId={todoList.id} />
              <List todoListId={todoList.id} />
            </div>
          );
        })}
    </div>
  );
}

export default ListList
