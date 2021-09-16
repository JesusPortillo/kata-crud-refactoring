package co.com.sofka.crud.repositories;

import co.com.sofka.crud.entities.ListTodo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface TodoListRepository extends CrudRepository<ListTodo, Long> {}