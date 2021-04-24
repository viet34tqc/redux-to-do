import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { TodoContext } from '../../../context/todoContext';

const useStyles = makeStyles( ( theme ) => ( {
	root: {
		'&': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItem: 'center',
		},
		'& + &': {
			marginTop: '10px'
		},
		'& .delete': {
			fontSize: '12px',
			padding: '6px 10px;'
		}
	},
} ) );

export default function Item( { id, title, completed } ) {
	const { setTodos } = useContext( TodoContext );

	async function handleComplete() {
		//dispatch( completeTodo( { id, completed: !completed } ) );
		async function getCompletedTodo() {
			const res = await fetch( `http://localhost:7000/todos/${ id }`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( { completed: !completed } ),
			} );
			if ( res.ok ) {
				return await res.json();
			}
		}
		const completedTodo = await getCompletedTodo();
		setTodos( prevTodos => prevTodos.map( todo => todo.id === completedTodo.id ? { ...todo, completed: !todo.completed } : todo ) );
	}
	async function handleDelete() {
		//dispatch( deleteTodo( { id } ) );

		async function getDeletedTodo() {
			const res = await fetch( `http://localhost:7000/todos/${ id }`, {
				method: 'DELETE',
			} );
			if ( res.ok ) {
				return id;
			}
		}
		const deletedTodo = await getDeletedTodo();
		setTodos( prevTodos => prevTodos.filter( todo => todo.id !== deletedTodo ) );
	}

	const classes = useStyles();

	return (
		<div className={ classes.root }>
			<FormControlLabel
				control={
					<Checkbox
						checked={ completed }
						onChange={ handleComplete }
						color="primary"
					/>
				}
				label={ title }
			/>
			<Button
				variant="contained"
				color="secondary"
				onClick={ handleDelete }
				className='delete'
			>
				Delete
			</Button>
		</div>
	);
}
