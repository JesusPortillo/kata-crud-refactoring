package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.ConvertDTO;
import co.com.sofka.crud.DTOs.TodoDTO;
import co.com.sofka.crud.entities.Todo;
import co.com.sofka.crud.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TodoService implements TodoServicesInterface{

    @Autowired
    private ConvertDTO mapper;

    @Autowired
    private TodoRepository repository;

    @Override
    public Iterable<TodoDTO> list(){
        ArrayList<TodoDTO> todoDTOS = new ArrayList<>();
        repository.findAll().forEach(el -> todoDTOS.add(mapper.convertToDto(el)));

        return todoDTOS;}

    @Override
    public TodoDTO get(long id) {
        return mapper.convertToDto(repository.findById(id).orElseThrow());
    }

    @Override
    public TodoDTO save(TodoDTO todoDTO){
        Todo todo = mapper.convertToEntity(todoDTO);
        return mapper.convertToDto(repository.save(todo));
    }

    @Override
    public TodoDTO update(TodoDTO todoDTO){
        Todo todo = repository.findById(todoDTO.getId()).orElseThrow();
        todo.setName(todoDTO.getName());
        todo.setCompleted(todoDTO.isCompleted());
        todo.setTodoListId(todoDTO.getTodoListId());
        return mapper.convertToDto(repository.save(todo));
    }

    @Override
    public void delete(long id) {
        repository.delete(mapper.convertToEntity(get(id)));
    }



}
