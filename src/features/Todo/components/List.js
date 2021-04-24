import React, { useContext } from 'react';
import { TodoContext } from '../../../context/todoContext';
import Item from './Item';

export default function List() {
	const { todos } = useContext( TodoContext );

	return todos.length > 0 && (
		<>
			{
				todos.map( todo => <Item key={ todo.id } id={ todo.id } title={ todo.title } completed={ todo.completed } /> )
			}
		</>
	);
}
