import React from 'react';
import { useSelector } from 'react-redux';
import Item from './Item';

export default function List() {
    const todos = useSelector( state => state.todos );
    return todos.length > 0 && (
        <div>
            {
                todos.map( todo => <Item key={ todo.id } id={ todo.id } title={ todo.title } completed={ todo.completed } /> )
            }
        </div>
    );
}
