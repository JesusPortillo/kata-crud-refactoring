package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.TodoListDTO;
import co.com.sofka.crud.entities.ListTodo;

import java.util.ArrayList;

public interface ListTodoServiceInterface {

    public Iterable<ListTodo> listAllTodo();
    public ListTodo getListTodo(long id);
    public ListTodo saveListTodo(TodoListDTO listTodo);
    public void deleteListTodo(long id);
}
