package co.com.sofka.crud.controllers;

import co.com.sofka.crud.DTOs.TodoDTO;
import co.com.sofka.crud.DTOs.TodoListDTO;
import co.com.sofka.crud.entities.ListTodo;
import co.com.sofka.crud.entities.Todo;
import co.com.sofka.crud.services.ListTodoService;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ListTodoController {

    @Autowired
    private ListTodoService service;

    @GetMapping(value = "api/listsOfTodo")
    public Iterable<ListTodo> listOfTodo(){
        return service.listAllTodo();
    }

    @PostMapping(value = "api/saveListTodo")
    public ListTodo saveListTodo(@RequestBody TodoListDTO todoListDTO){
        return service.saveListTodo(todoListDTO);
    }

    @DeleteMapping(value = "api/{id}/deleteTodoList")
    public void deleteTodoList(@PathVariable("id")Long id){
        service.deleteListTodo(id);
    }

    @GetMapping(value = "api/{id}/getTodoList")
    public ListTodo getTodoList(@PathVariable("id") Long id){
        return service.getListTodo(id);
    }
}
