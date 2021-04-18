import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from '../../../store/todoSlice';
import Item from './Item';

export default function List() {
	const dispatch = useDispatch();
	const todos = useSelector( state => state.todos );

	useEffect( () => {
		dispatch( getTodosAsync() );
	}, [ dispatch ] );

	return todos.length > 0 && (
		<div>
			{
				todos.map( todo => <Item key={ todo.id } id={ todo.id } title={ todo.title } completed={ todo.completed } /> )
			}
		</div>
	);
}
