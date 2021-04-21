import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const res = await fetch( 'http://localhost:7000/todos2' );
		if ( !res.ok ) {
			return {};
		}
		const todos = await res.json();
		return { todos }; // payload
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	// payload is an object
	async ( payload ) => {
		const res = await fetch( 'http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { title: payload.title } ),
		} );
		if ( !res.ok ) {
			const todo = {
				id: Math.random().toString( 36 ).substr( 2, 9 ),
				completed: false,
				title: payload.title
			};
			return { todo };
		}
		const todo = await res.json();
		return { todo };
	}
);

export const completeTodoAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async ( payload ) => {
		const res = await fetch( `http://localhost:7000/todos/${ payload.id }`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { completed: payload.completed } ),
		} );
		if ( res.ok ) {
			const todo = await res.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async ( payload ) => {
		const res = await fetch( `http://localhost:7000/todos/${ payload.id }`, {
			method: 'DELETE',
		} );
		if ( res.ok ) {
			return { id: payload.id };
		}
	}
);

const todoSlice = createSlice( {
	'name': 'todos',
	initialState: [],
	reducers: {
		// addTodo là 1 reducer và cũng là 1 action creator (nhận vào payload)
		addTodo: ( state, action ) => {
			state.push( {
				id: Math.random().toString( 36 ).substr( 2, 9 ),
				completed: false,
				title: action.payload.title
			} );
		},
		deleteTodo: ( state, action ) => {
			return state.filter( todo => todo.id !== action.payload.id );
		},
		completeTodo: ( state, action ) => {
			const index = state.findIndex( todo => todo.id === action.payload.id );
			state[ index ].completed = action.payload.completed;
		}
	},
	extraReducers: {
		[ getTodosAsync.fulfilled ]: ( state, action ) => {
			return action.payload.todos;
		},
		[ addTodoAsync.fulfilled ]: ( state, action ) => {
			state.push( action.payload.todo );
		},
		[ completeTodoAsync.fulfilled ]: ( state, action ) => {
			const index = state.findIndex( todo => todo.id === action.payload.todo.id );
			state[ index ].completed = action.payload.todo.completed;
		},
		[ deleteTodoAsync.fulfilled ]: ( state, action ) => {
			return state.filter( todo => todo.id !== action.payload.id );
		},
	}
} );

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
