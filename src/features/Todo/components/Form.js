import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useContext } from 'react';
import { TodoContext } from '../../../context/todoContext';
import { useForm } from '../../../hooks/useForm';

const useStyles = makeStyles( ( theme ) => ( {
	root: {
		'& .submit': {
			marginLeft: '10px'
		},
	},
} ) );

export default function Form() {
	const { todos, setTodos } = useContext( TodoContext );

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

	async function onSubmit( e ) {
		const title = data.title;
		const res = await fetch( 'http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { title } ),
		} );
		if ( !res.ok ) {
			const todo = {
				id: Math.random().toString( 36 ).substr( 2, 9 ),
				completed: false,
				title
			};
			return { todo };
		}
		const todo = await res.json();
		setTodos( [ ...todos, todo ] );
		setData( '' );
	}

	const classes = useStyles();

	return (
		<div className={ classes.root }>
			<form action="" onSubmit={ handleSubmit }>
				{ errors.title && <p className="error">{ errors.title }</p> }
				<TextField
					type="text"
					placeholder="Add todo"
					value={ data.title || '' }
					onChange={ handleChange( 'title' ) }
				/>
				<Button type="submit" variant="contained" color="primary" className="submit">
					Submit
      			</Button>
			</form>
		</div>
	);
}

