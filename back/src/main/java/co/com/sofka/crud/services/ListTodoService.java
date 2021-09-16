package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.TodoListDTO;
import co.com.sofka.crud.entities.ListTodo;
import co.com.sofka.crud.repositories.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ListTodoService implements ListTodoServiceInterface{

    @Autowired
    private TodoListRepository repository;

    @Override
    public Iterable<ListTodo> listAllTodo() {
        return repository.findAll();
    }

    @Override
    public ListTodo getListTodo(long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public ListTodo saveListTodo(TodoListDTO todoListDTO) {
        ListTodo listTodo = new ListTodo();
        listTodo.setName(todoListDTO.getName());
        return repository.save(listTodo);
    }

    @Override
    public void deleteListTodo(long id) {
        repository.delete(getListTodo(id));
    }


}
