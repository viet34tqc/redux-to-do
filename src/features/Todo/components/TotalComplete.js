import React from 'react';
import { useSelector } from 'react-redux';

export default function TotalComplete() {
	const completeItems = useSelector( state => state.todos.filter( item => item.completed ) );
	const todos = useSelector( state => state.todos );
	return todos.length > 0 && (
		<h4>Total complete items: {completeItems.length }</h4>
	);
}

