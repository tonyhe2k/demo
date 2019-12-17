package com.example.todo.repository;

import com.example.todo.domain.Todo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(path = "todo", collectionResourceRel = "todo")
public interface TodoRepository  extends PagingAndSortingRepository<Todo, Long> {
}
