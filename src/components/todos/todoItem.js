import React, { useContext } from "react";
import { TodoContext } from "./todoContext";
import {
  changeEditInput,
  saveEditInput,
  cancleEditInput,
  isComplete,
  editTodo,
  deleteTodo,
} from "./todoActions";
import { update, remove } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function TodoItem({ todo, inputRef, focus, setfocus }) {
  const { dispatch } = useContext(TodoContext);
  return (
    <li key={todo.id}>
      {todo.isEditing ? (
        <input
          className="edit-input"
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
              todo.todo = todo.editingText;
              todo.isEditing = false;
              update(todo);
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
                dispatch(isComplete(todo));
                todo.isComplete = !todo.isComplete;
                update(todo);
              }}
            />
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                dispatch(deleteTodo(todo));
                remove(todo);
              }}
            />
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
