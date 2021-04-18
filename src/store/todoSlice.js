import { createSlice } from "@reduxjs/toolkit";


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
	}
} );

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
