package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.TodoDTO;
import co.com.sofka.crud.entities.Todo;

public interface TodoServicesInterface {

    public Iterable<Todo> list();
    public Todo get(long id);
    public Todo save(TodoDTO todoDTO);
    public void delete(long id);
    public Todo update(TodoDTO todoDTO);
}
