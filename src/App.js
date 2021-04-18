import React from 'react';
import Form from './features/Todo/components/Form';
import List from './features/Todo/components/List';
import TotalComplete from './features/Todo/components/TotalComplete';

function App() {
	return (
		<>
			<h1>My todo list</h1>
			<Form />
			<TotalComplete />
			<List />
		</>
	);
}

export default App;
