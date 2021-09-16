package co.com.sofka.crud.services;

import co.com.sofka.crud.DTOs.ConvertDTO;
import co.com.sofka.crud.DTOs.TodoListDTO;
import co.com.sofka.crud.entities.ListTodo;
import co.com.sofka.crud.repositories.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class ListTodoService implements ListTodoServiceInterface{


    @Autowired
    private ConvertDTO mapper;

    @Autowired
    private TodoListRepository repository;

    @Override
    public Iterable<TodoListDTO> listAllTodo() {
        ArrayList<TodoListDTO> todoListDTOS = new ArrayList<>();
        repository.findAll().forEach(el -> todoListDTOS.add(mapper.convertToListDto(el)));
        return todoListDTOS;
    }

    @Override
    public TodoListDTO getListTodo(long id) {
        return mapper.convertToListDto(repository.findById(id).orElseThrow());
    }

    @Override
    public TodoListDTO saveListTodo(TodoListDTO todoListDTO) {
        ListTodo listTodo = mapper.convertToEntityList(todoListDTO);
        return mapper.convertToListDto(repository.save(listTodo));
    }

    @Override
    public void deleteListTodo(long id) {
        repository.delete(mapper.convertToEntityList(getListTodo(id)));
    }


}
