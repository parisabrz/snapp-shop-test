import React from "react";
import { TodoProvider } from "./todoContext";
import Todo from "./todo";

function Todos() {
  return (
    <TodoProvider>
      <div className="todos">
        <h1>Todo</h1>
        <Todo />
      </div>
    </TodoProvider>
  );
}

export default Todos;
