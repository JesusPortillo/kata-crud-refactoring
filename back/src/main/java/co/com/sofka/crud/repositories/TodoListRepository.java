package co.com.sofka.crud.repositories;

import co.com.sofka.crud.entities.ListTodo;
import org.springframework.data.repository.CrudRepository;

public interface TodoListRepository extends CrudRepository<ListTodo, Long> {}