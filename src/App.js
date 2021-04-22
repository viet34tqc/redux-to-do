import Container from '@material-ui/core/Container';
import React from 'react';
import Form from './features/Todo/components/Form';
import List from './features/Todo/components/List';
import TotalComplete from './features/Todo/components/TotalComplete';
function App() {
	return (
		<Container maxWidth="xs">
			<h1>My todo list</h1>
			<Form />
			<TotalComplete />
			<List />
		</Container>
	);
}

export default App;
