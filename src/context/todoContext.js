import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();
export const TodoProvider = ( ( { children } ) => {
	const [ todos, setTodos ] = useState( [] );
	useEffect( () => {
		const fetchTodos = async () => {
			const res = await fetch( 'http://localhost:7000/todos' );
			if ( !res.ok ) {
				return [];
			}
			const todos = await res.json();
			setTodos( () => todos );
		};
		fetchTodos();
	}, [] );

	// value here can be anything, which is like the state in the store.
	return <TodoContext.Provider value={ { todos, setTodos } }>{ children }</TodoContext.Provider>;
} );
