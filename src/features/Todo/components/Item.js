import React from 'react';
import { useDispatch } from 'react-redux';
import { completeTodoAsync, deleteTodoAsync } from '../../../store/todoSlice';

export default function Item( { id, title, completed } ) {
	const dispatch = useDispatch();

	function handleComplete() {
		//dispatch( completeTodo( { id, completed: !completed } ) );
		dispatch( completeTodoAsync( { id, completed: !completed } ) );
	}
	function handleDelete() {
		//dispatch( deleteTodo( { id } ) );
		dispatch( deleteTodoAsync( { id } ) );
	}
	return (
		<div>
			<input type="checkbox" onChange={ handleComplete } />
			{ title }
			<button onClick={ handleDelete }>Delete</button>
		</div>
	);
}
