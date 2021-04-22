import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { addTodoAsync } from '../../../store/todoSlice';

const useStyles = makeStyles( ( theme ) => ( {
	root: {
		'& .submit': {
			marginLeft: '10px'
		},
	},
} ) );

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
				<Button variant="contained" color="primary" className="submit">
					Submit
      			</Button>
			</form>
		</div>
	);
}

