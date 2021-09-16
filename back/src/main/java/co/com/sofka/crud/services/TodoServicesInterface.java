package co.com.sofka.crud.services;

import co.com.sofka.crud.entities.Todo;

import java.util.ArrayList;
import java.util.Optional;

public interface TodoServicesInterface {

    public ArrayList<Todo> list();
    public Optional<Todo> get(long id);
    public Todo save(Todo todo);
    public void delete(long id);
}
