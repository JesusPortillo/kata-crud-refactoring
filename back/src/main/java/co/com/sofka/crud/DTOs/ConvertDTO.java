package co.com.sofka.crud.DTOs;

import co.com.sofka.crud.entities.ListTodo;
import co.com.sofka.crud.entities.Todo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConvertDTO {
    @Autowired
    private ModelMapper mapper;

    public TodoDTO convertToDto(Todo todo) {
        TodoDTO todoDto = mapper.map(todo, TodoDTO.class);
        return todoDto;
    }
    public Todo convertToEntity(TodoDTO dto){
        Todo todo = mapper.map(dto, Todo.class);
        return todo;
    }

    public TodoListDTO convertToListDto(ListTodo listTodo) {
        TodoListDTO todoListDTO = mapper.map(listTodo, TodoListDTO.class);
        return todoListDTO;
    }
    public ListTodo convertToEntityList(TodoListDTO todoListDTO){
        ListTodo listTodo = mapper.map(todoListDTO, ListTodo.class);
        return listTodo;
    }
}
