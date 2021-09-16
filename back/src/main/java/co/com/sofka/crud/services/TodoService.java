package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.TodoDTO;
import co.com.sofka.crud.entities.Todo;
import co.com.sofka.crud.repositories.TodoRepository;
import org.springframework.stereotype.Service;

@Service
public class TodoService implements TodoServicesInterface{


    private TodoRepository repository;

    @Override
    public Iterable<Todo> list(){return repository.findAll();}

    @Override
    public Todo get(long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Todo save(TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.setName(todoDTO.getName());
        todo.setCompleted(todoDTO.isCompleted());
        todo.setGroupListId(todo.getGroupListId());
        return repository.save(todo);
    }

    @Override
    public Todo update(TodoDTO todoDTO){
        Todo todo = repository.findById(todoDTO.getId()).orElseThrow();
        todo.setName(todoDTO.getName());
        todo.setCompleted(todoDTO.isCompleted());
        todo.setGroupListId(todoDTO.getTodoListId());
        return repository.save(todo);
    }

    @Override
    public void delete(long id) {
        repository.delete(get(id));
    }


}
