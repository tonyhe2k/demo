package com.example.todo;

import com.example.todo.domain.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.Date;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

//	@Autowired
//	public TodoRepository todoRepositon;
//
//	@Component
//	class DataSetup implements ApplicationRunner {
//
//		@Override
//		public void run(ApplicationArguments args) throws Exception {
//			todoRepositon.save(Todo.builder().description("Take out trash").isCompleted(false).targetDate(new Date()).build() );
//			todoRepositon.save(Todo.builder().description("Wash Cloth").isCompleted(false).targetDate(new Date()).build() );
//
//		}
//
//	}
}
