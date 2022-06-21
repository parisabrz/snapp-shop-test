import React, { createContext, useState } from "react";
import { remove } from "../../utils/utils";
import {
  ADD_TODO,
  LOAD_TODOS,
  CHANGE_INPUT,
  DELETE_TODO,
  Edit_TODO,
  CHANGE_EDIT_INPUT,
  SAVE_EDIT_INPUT,
  CANCLE_EDIT_INPUT,
  IS_COMPLETE,
  UNDO_COMPLETE,
  DELETE_COMPLETE,
  SET_FILTER
} from "./todoActions";

const initialState = {
  inputText: "",
  todos: [],
  complete_todos: [],
  filter: false,
};

function TodoReducer(state, action) {
  const { type, text } = action;
  switch (type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case ADD_TODO:
      if (!state.inputText) return state;
      
      return {
        ...state,
        todos: [
          {
            id: action.id,
            todo: state.inputText,
            isEditing: false,
            editingText: state.inputText,
            isComplete: false,
          },
          ...state.todos,
        ],
        inputText: "",
      };

    case CHANGE_INPUT:
      return {
        ...state,
        inputText: text,
      };
    case DELETE_TODO:
      const deletedTodos = state.todos.filter(
        (item) => item.id !== action.todo.id
      );
      return {
        ...state,
        todos: deletedTodos,
      };
    case Edit_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return {
              ...todo,
              isEditing: true,
            };
          }
          return todo;
        }),
      };
    case CHANGE_EDIT_INPUT:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return {
              ...todo,
              editingText: action.task,
            };
          }
          return todo;
        }),
      };
    case SAVE_EDIT_INPUT:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return {
              ...todo,
              todo: todo.editingText,
              isEditing: false,
            };
          }
          return todo;
        }),
      };
    case CANCLE_EDIT_INPUT:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return {
              ...todo,
              editingText: todo.todo,
              isEditing: false,
            };
          }
          return todo;
        }),
      };
    case IS_COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return {
              ...todo,
              isComplete: !todo.isComplete,
            };
          }
          return todo;
        }),
      };

    case UNDO_COMPLETE:
      const undoTodos = state.complete_todos.splice(action.index, 1);
      return {
        ...state,
        todos: [...state.todos, ...undoTodos],
        complete_todos: [...state.complete_todos],
        isComplete: !state.todos.isComplete,
      };

    case DELETE_COMPLETE:
      const deletedComplete = state.todos.filter((item) => !item.isComplete);
      state.todos.forEach((item) => {
        if (item.isComplete) {
          remove(item);
        }
      });
      return {
        ...state,
        todos: deletedComplete,
      };
    case SET_FILTER:
      return{
        ...state,
        filter: !state.filter
      }
    default:
      return state;
  }
}

// ===================================================================

const TodoContext = createContext(initialState);

function useReducer(reducerFunction, initialState) {
  const [reducer, setReducer] = useState(initialState);

  const dispatch = (action) => {
    setReducer(reducerFunction(reducer, action));
  };

  return [reducer, dispatch];
}

function TodoProvider(props) {
  const [reducer, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <TodoContext.Provider
      value={{
        reducer,
        dispatch,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
