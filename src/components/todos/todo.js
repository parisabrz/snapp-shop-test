//           {/* ***************************************** */}
//           <div className="deleted-todos">
//             <h1>Deleted ToDos</h1>
//             <ul>
//               {reducer.deleted_Todos.map((todos_deleted, index) => {
//                 return (
//                   <li style={{ marginTop: "10px" }} key={todos_deleted.id}>
//                     <span style={{ marginRight: "15px" }}>
//                       {todos_deleted.todo}
//                     </span>
//                     <button
//                       onClick={() => {
//                         dispatch(undo_delete(todos_deleted));
//                       }}
//                       className="todo-btn"
//                     >
//                       undo
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           <div className="deleted-todos">
//             <h1>complete todos</h1>
//             <ul>
//               {reducer.complete_todos.map((todo) => {
//                 return (
//                   <li style={{ marginTop: "10px" }} key={todo.id}>
//                     <input
//                       type="checkbox"
//                       checked
//                       style={{ borderColor: "darkgrey", color: "darkgrey" }}
//                     />
//                     <span className="line-into">{todo.todo}</span>
//                     <button
//                       className="todo-btn"
//                       onClick={() => {
//                         dispatch(undoComplete(todo));
//                       }}
//                       style={{ marginLeft: "10px" }}
//                     >
//                       undo
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Todo;

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
        {reducer.todos.map((todo) => {
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
    </div>
  );
}

export default Todo;
