import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "./todoContext";
import { setFilter, deletedComplete } from "./todoActions";

function ControlBox({ todos }) {
  const { reducer, dispatch } = useContext(TodoContext);
  const [activeTodos, setActiveTodos] = useState();

  useEffect(() => {
    setActiveTodos(todos.filter((task) => !task.isComplete).length);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {todos.length !== 0 && (
        <div className="control-box">
          <div>{activeTodos} items left</div>
          <div className="center-btn">
            <button
              className={!reducer.filter ? "active" : ""}
              onClick={() => {
                dispatch(setFilter(false));
                window.history.pushState("object or string", "Title", "/all");
              }}
            >
              All
            </button>
            <button
              className={reducer.filter ? "active" : ""}
              onClick={() => {
                dispatch(setFilter(true));
                window.history.pushState(
                  "object or string",
                  "Title",
                  "/active"
                );
              }}
            >
              Active
            </button>
          </div>
          <button
            onClick={() => {
              dispatch(deletedComplete());
            }}
          >
            Clear Completed
          </button>
        </div>
      )}
    </>
  );
}

export default ControlBox;
