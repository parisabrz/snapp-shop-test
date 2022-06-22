import React, { Suspense } from "react";
import { TodoProvider } from "./todoContext";
import Spinner from "../spinner/spinner";
const Todo = React.lazy(() => import("./todo"));

function Todos() {
  return (
    <TodoProvider>
      <div className="todos">
        <h1>Todo</h1>
        <Suspense fallback={<Spinner/>}>
        <Todo />
        </Suspense>
      </div>
    </TodoProvider>
  );
}

export default Todos;
