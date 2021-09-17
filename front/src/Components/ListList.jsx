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
            <div key={todoList.id}>
              <div>
                <h4>{ todoList.name ? todoList.name.toUpperCase() : ""}</h4>
                <button className="delete-button" type="button"onClick={() => onDelete(todoList.id)}>Eliminar</button>
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
