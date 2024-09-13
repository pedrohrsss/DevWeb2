import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodoData } from "../models/Todo";
import AddTodo from "./AddTodo";
import Row from "./Row";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useLocalStorage<Array<TodoData>>("todos", []);

  const todoLength = todos?.length;
  const hasTodo = todoLength && todoLength > 0;
  const remainingTodos = todos?.filter(
    (todo) => todo.isCompleted !== true
  ).length;

  const deleteTodoHandler = (id: string) => {
    const newTodos = todos?.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const checkTodoHandler = (id: string) => {
    const newTodos = todos?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const changeTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(value);
  };

  const addTodoHandler = (todo: TodoData) => {
    const newTodos = [...todos!, todo];
    setTodos(newTodos);
    setTask("");
  };

  const submitTodoHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const todo: TodoData = {
      id: Math.random().toString(),
      task: task,
      isCompleted: false,
    };
    task && addTodoHandler(todo);
  };

  return (
    <div className="w-10/12 sm:w-2/3 lg:w-2/5 max-w-2xl flex flex-col items-center">
      <AddTodo
        onSubmit={submitTodoHandler}
        onChnage={changeTodoHandler}
        task={task}
      />
      <div className="h-10" />
      <div className="w-full">
        {todos?.map((todo) => {
          return (
            <Row
              key={todo.id}
              todo={todo}
              onDelete={deleteTodoHandler}
              onCheck={checkTodoHandler}
            />
          );
        })}
      </div>
      {hasTodo !== 0 && (
        <p className="text-gray-300">{`${remainingTodos} of ${todoLength}`}</p>
      )}
      {!hasTodo && (
        <p className="text-gray-400 mb-5 text-xlcapitalize ">Add new todo!</p>
      )}
    </div>
  );
};

export default Todo;