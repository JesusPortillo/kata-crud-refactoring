import React, { useContext, useRef, useState } from 'react';
import Store from '../Store/Store';


const HOST_API = "http://localhost:8080/api";

function ListForm() {
    const formRef = useRef(null);
    const { state: { todoList, errorTodoList }, dispatch } = useContext(Store);
    const item = todoList.item;
    const error = errorTodoList;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();
        if (state.name === undefined || state.name === "") {
            dispatch({ type: "update-errorTodoList", error: true });
        } else {
            dispatch({ type: "update-errorTodoList", error: false });
            const request = {
                name: state.name,
                id: null
            };

            fetch(HOST_API + "/saveListTodo", {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todoList) => {
                    dispatch({ type: "add-todoList", item: todoList });
                    setState({ name: "" });
                    formRef.current.reset();
                });
        }
    }

    return (
        <div className = "create-list-div">
            <h1>To do List</h1>
            <form className="form-inline" ref={formRef}>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Nombre de la lista" 
                    className={error ? "is-invalid form-control form-control-sm" : "form-control-sm"} defaultValue={item.name} onChange={(event) => { setState({ ...state, name: event.target.value }) }}></input>
                </div>
                <button type="button" className="btn btn-success btn-sm ml-2" onClick={onAdd}>Nueva lista</button>
            </form>
        </div>
    )
}

export default ListForm