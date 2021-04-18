import React from 'react';
import { useDispatch } from 'react-redux';
import { completeTodo, deleteTodo } from '../../../store/todoSlice';

export default function Item( { id, title, completed } ) {
	const dispatch = useDispatch();

	function handleComplete() {
		dispatch( completeTodo( { id, completed: !completed } ) );
	}
	function handleDelete() {
		dispatch( deleteTodo( { id } ) );
	}
	return (
		<div>
			<input type="checkbox" onChange={ handleComplete } />
			{ title }
			<button onClick={ handleDelete }>Delete</button>
		</div>
	);
}
