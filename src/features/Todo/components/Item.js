import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { completeTodoAsync, deleteTodoAsync } from '../../../store/todoSlice';

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
	const dispatch = useDispatch();

	function handleComplete() {
		//dispatch( completeTodo( { id, completed: !completed } ) );
		dispatch( completeTodoAsync( { id, completed: !completed } ) );
	}
	function handleDelete() {
		//dispatch( deleteTodo( { id } ) );
		dispatch( deleteTodoAsync( { id } ) );
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
