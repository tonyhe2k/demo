package com.example.todo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class Todo {
    @Id
    @GeneratedValue
    private long id;

    @NotNull
    private String description;

    private boolean isCompleted;

    private Date targetDate;
}
