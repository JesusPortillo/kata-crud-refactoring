package co.com.sofka.crud.repositories;

import co.com.sofka.crud.DTOs.TodoDTO;
import co.com.sofka.crud.entities.Todo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface TodoRepository extends CrudRepository<Todo, Long> {}
