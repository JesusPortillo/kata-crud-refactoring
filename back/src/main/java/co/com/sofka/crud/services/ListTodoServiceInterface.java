package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.TodoListDTO;
import co.com.sofka.crud.entities.ListTodo;

import java.util.ArrayList;

public interface ListTodoServiceInterface {

    public Iterable<TodoListDTO> listAllTodo();
    public TodoListDTO getListTodo(long id);
    public TodoListDTO saveListTodo(TodoListDTO todoListDTO);
    public void deleteListTodo(long id);
}
