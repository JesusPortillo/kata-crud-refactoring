package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.TodoDTO;

import java.util.ArrayList;

public interface TodoServicesInterface {

    public Iterable<TodoDTO> list();
    public TodoDTO get(long id);
    public TodoDTO save(TodoDTO todoDTO);
    public void delete(long id);
    public TodoDTO update(TodoDTO todoDTO);

}
