package co.com.sofka.crud.controllers;

import co.com.sofka.crud.DTOs.TodoDTO;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;


    @GetMapping(value = "api/todos")
    public Iterable<TodoDTO> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public TodoDTO save(@RequestBody TodoDTO todoDto){
        return service.save(todoDto);
    }

    @PutMapping(value = "api/todo")
    public TodoDTO update(@RequestBody TodoDTO todoDTO){
        if(todoDTO.getId() != null){
            return service.save(todoDTO);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public TodoDTO get(@PathVariable("id") Long id){
        return service.get(id);
    }



}
