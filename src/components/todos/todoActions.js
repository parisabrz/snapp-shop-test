export const ADD_TODO = 'ADD_TODO';
export const addTodo = () => ({
	type: ADD_TODO
});

export const CHANGE_INPUT = 'CHANGE_INPUT';
export const changeInput = (text) => ({
	type: CHANGE_INPUT,
	text
});

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (todo) => ({
	type: DELETE_TODO,
	todo
});

export const UNDO_DELETE_TODO = 'UNDO_DELETE_TODO';
export const undo_delete = (todo) => ({
	type: UNDO_DELETE_TODO,
	todo
});

export const Edit_TODO = 'Edit_TODO';
export const editTodo = (todo) => ({
	type: Edit_TODO,
	todo
});

export const CHANGE_EDIT_INPUT = 'CHANGE_EDIT_INPUT';
export const changeEditInput = (todo, task) => ({
	type: CHANGE_EDIT_INPUT,
	todo,
	task
});

export const SAVE_EDIT_INPUT = 'SAVE_EDIT_INPUT';
export const saveEditInput = (todo) => ({
	type: SAVE_EDIT_INPUT,
	todo
});

export const CANCLE_EDIT_INPUT = 'CANCLE_EDIT_INPUT';
export const cancleEditInput = (todo) => ({
	type: CANCLE_EDIT_INPUT,
	todo
});

export const IS_COMPLETE = 'IS_COMPLETE';
export const isComplete = (todo) => ({
	type: IS_COMPLETE,
	todo
});

export const UNDO_COMPLETE = 'UNDO_COMPLETE';
export const undoComplete = (todo) => ({
	type: UNDO_COMPLETE,
	todo
});