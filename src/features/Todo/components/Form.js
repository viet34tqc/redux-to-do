import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, addTodoAsync } from '../../../store/todoSlice';
export default function Form() {
    const [ value, setValue ] = useState( '' );
    const dispatch = useDispatch();

    function handleSubmit( e ) {
        e.preventDefault();
        if ( value ) {
            const action = addTodoAsync( { title: value } ); // return an object, action is a object.
            dispatch( action );
            setValue( '' );
        }
    }

    return (
        <div>
            <form action="" onSubmit={ handleSubmit }>
                <input
                    type="text"
                    value={ value }
                    onChange={ e => setValue( e.target.value ) }
                />
                <input type="submit" value="" />
            </form>
        </div>
    );
}

