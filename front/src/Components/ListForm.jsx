import React, { useContext, useRef, useState } from 'react';
import Store from '../Store/Store';


const HOST_API = "http://localhost:8080/api";

function ListForm() {
    const formRef = useRef(null);
    const { state: { todoList }, dispatch } = useContext(Store);
    const item = todoList.item;
    const [state, setState] = useState(item);
    const [errorEmpty, seterrorEmpty] = useState(false);

    var patt = new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/);
    const onAdd = (event) => {
        seterrorEmpty(false)
        event.preventDefault();
        const request = {
            name: state.name,
            id: null
        };



        (state.name !== undefined && patt.test(state.name)) ?

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
                })
            :
            seterrorEmpty(true)



    }

    return (
        <div className="create-list-div">
            <form ref={formRef}>
                <div>
                    <input type="text" name="name" placeholder="Escribe el nombre de tu nueva lista de tareas"
                        defaultValue={item.name} onChange={(event) => { setState({ ...state, name: event.target.value }) }}></input>
                </div>
                <button type="button" onClick={onAdd}>Nueva lista</button>
                <span className={errorEmpty ? "error-on-empty" : "error-off-empty"}>Por favor verifica que ingreses un caracter valido</span>
            </form>
        </div>
    )
}

export default ListForm
