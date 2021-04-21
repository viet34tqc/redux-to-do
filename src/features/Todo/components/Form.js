import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { addTodoAsync } from '../../../store/todoSlice';

export default function Form() {
	const dispatch = useDispatch();
	const { handleSubmit, handleChange, data, setData, errors } = useForm( {
		validations: {
			title: {
				required: {
					value: true,
					message: 'This field is required',
				}
			}
		},
		onSubmit
	} );

	function onSubmit( e ) {
		const action = addTodoAsync( { title: data.title } ); // return an object, action is a object.
		dispatch( action );
		setData( '' );
	}

	return (
		<div>
			<form action="" onSubmit={ handleSubmit }>
				{ errors.title && <p className="error">{ errors.title }</p> }
				<input
					type="text"
					value={ data.title || '' }
					onChange={ handleChange( 'title' ) }
				/>
				<input type="submit" value="" />
			</form>
		</div>
	);
}

