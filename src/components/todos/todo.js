import React, { useContext, useRef, useEffect, useState } from "react";
import { TodoContext } from "./todoContext";
import {
  changeInput,
  changeEditInput,
  saveEditInput,
  cancleEditInput,
  isComplete,
  //   undoComplete,
  editTodo,
  //   undo_delete,
  deleteTodo,
} from "./todoActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const { reducer, dispatch } = useContext(TodoContext);
  const inputRef = useRef(null);
  const [focus, setfocus] = useState();
  const [filter, setFilter] = useState(false);
  console.log(reducer);
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div className="todo-container">
      <input
        className="todo-input"
        placeholder="What needs to be done?"
        type="text"
        value={reducer.inputText}
        onChange={(e) => {
          dispatch(changeInput(e.target.value));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch({ type: "ADD_TODO" });
          }
        }}
      />
      <ul>
        {filter
          ? reducer.todos
              .filter((todo) => todo.isComplete === false)
              .map((todo) => {
                return (
                  <li key={todo.id}>
                    {todo.isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={todo.editingText}
                        onChange={(e) => {
                          dispatch(changeEditInput(todo, e.target.value));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(saveEditInput(todo));
                            setfocus(!focus);
                          }
                        }}
                        onBlur={() => {
                          dispatch(cancleEditInput(todo));
                          setfocus(!focus);
                        }}
                      />
                    ) : (
                      <>
                        <span
                          className={todo.isComplete ? "line-into" : ""}
                          onDoubleClick={() => {
                            dispatch(editTodo(todo));
                            setfocus(true);
                          }}
                        >
                          {todo.todo}
                        </span>
                        <div>
                          <input
                            type="checkbox"
                            checked={todo.isComplete}
                            onChange={() => {
                              console.log("here");
                              dispatch(isComplete(todo));
                            }}
                          />
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                              dispatch(deleteTodo(todo));
                            }}
                          />
                        </div>
                      </>
                    )}
                  </li>
                );
              })
          : reducer.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  {todo.isEditing ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={todo.editingText}
                      onChange={(e) => {
                        dispatch(changeEditInput(todo, e.target.value));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(saveEditInput(todo));
                          setfocus(!focus);
                        }
                      }}
                      onBlur={() => {
                        dispatch(cancleEditInput(todo));
                        setfocus(!focus);
                      }}
                    />
                  ) : (
                    <>
                      <span
                        className={todo.isComplete ? "line-into" : ""}
                        onDoubleClick={() => {
                          dispatch(editTodo(todo));
                          setfocus(true);
                        }}
                      >
                        {todo.todo}
                      </span>
                      <div>
                        <input
                          type="checkbox"
                          checked={todo.isComplete}
                          onChange={() => {
                            console.log("here");
                            dispatch(isComplete(todo));
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() => {
                            dispatch(deleteTodo(todo));
                          }}
                        />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
      </ul>
      <>
        {reducer.todos.length !== 0 && (
          <div className="control-box">
            <div>{reducer.todos.length} items left</div>
            <div className="center-btn">
              <button
                onClick={() => {
                  setFilter(false);
                  window.history.pushState("object or string", "Title", "/all");
                }}
              >
                All
              </button>
              <button
                onClick={() => {
                  setFilter(true);
                  window.history.pushState("object or string", "Title", "/active");
                }}
              >
                Active
              </button>
            </div>
            <button disabled>Clear Completed</button>
          </div>
        )}
      </>
    </div>
  );
}

export default Todo;
