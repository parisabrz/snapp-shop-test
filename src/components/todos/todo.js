import React, { useContext, useRef, useEffect, useState } from "react";
import { TodoContext } from "./todoContext";
import { v4 as uuidv4 } from "uuid";
import { changeInput, loadTodos, addTodo } from "./todoActions";
import { add } from "../../utils/utils";
import ControlBox from "./controlBox";
import TodoItem from "./todoItem";

function Todo() {
  const { reducer, dispatch } = useContext(TodoContext);
  const inputRef = useRef(null);

  // -------------------- States-----------------------------
  const [focus, setfocus] = useState();
  // --------------------------------------------------------
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]); // eslint-disable-line react-hooks/exhaustive-deps

  const getFetchTodos = () => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((result) => dispatch(loadTodos(result)))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFetchTodos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
                  const id = uuidv4();
                  dispatch(addTodo(id));
                  add({
                    id: id,
                    todo: reducer.inputText,
                    isEditing: false,
                    editingText: reducer.inputText,
                    isComplete: false,
                  });
                }
              }}
            />
            <ul>
              {reducer.filter
                ? reducer.todos
                    .filter((todo) => todo.isComplete === false)
                    .map((todo) => {
                      return (
                        <TodoItem
                          todo={todo}
                          inputRef={inputRef}
                          focus={focus}
                          setfocus={setfocus}
                        />
                      );
                    })
                : reducer.todos.map((todo) => {
                    return (
                      <TodoItem
                        todo={todo}
                        inputRef={inputRef}
                        focus={focus}
                        setfocus={setfocus}
                      />
                    );
                  })}
            </ul>
            <div className="divider"></div>
          </div>
          <ControlBox todos={reducer.todos} />
    </>
  );
}

export default Todo;
