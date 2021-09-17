import React, { useContext, useRef, useState } from 'react';
import Store from '../Store/Store';


const HOST_API = "http://localhost:8080/api";

function ListForm() {
    const formRef = useRef(null);
    const { state: { todoList }, dispatch } = useContext(Store);
    const item = todoList.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();
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

    return (
        <div className="create-list-div">
            <h1 className="tittle">To do List</h1>
            <form ref={formRef}>
                <div >
                    <input type="text" name="name" placeholder="Escribe el nombre de tu nueva lista de tareas"
                        defaultValue={item.name} onChange={(event) => { setState({ ...state, name: event.target.value }) }}></input>
                </div>
                <button type="button" onClick={onAdd}>Nueva lista</button>
            </form>
        </div>
    )
}

export default ListForm
