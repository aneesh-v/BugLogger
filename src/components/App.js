import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AddLogItem from './AddLogItem';
import LogItem from './LogItem';

const App = () => {
	const [logs, setLogs] =
		useState(/*[
		{
			_id: 1,
			text: 'This is log one',
			priority: 'low',
			user: 'Aneesh',
			created: new Date().toString(),
		},
		{
			_id: 2,
			text: 'This is log two',
			priority: 'moderate',
			user: 'Kate',
			created: new Date().toString(),
		},
		{
			_id: 3,
			text: 'This is log three',
			priority: 'high',
			user: 'John',
			created: new Date().toString(),
		},
	]*/);
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: 'success',
	});

	useEffect(() => {
		// Tells the main process to load log from mongoDB
		ipcRenderer.send('logs:load');

		// Get teh log from mongoDB
		ipcRenderer.on('logs:get', (e, logs) => {
			setLogs(JSON.parse(logs));
		});
		ipcRenderer.on('logs:clear', () => {
			setLogs([]);
			showAlert('All Logs Cleared.');
		});
	}, []);
	function addItem(item) {
		if (item.text === '' || item.user === '' || item.priority === '') {
			showAlert('Please enter all fields', 'danger');
			return false;
		}

		// item._id = Math.floor(Math.random() * 9000) + 10000;
		// item.created = new Date().toString();
		// setLogs([...logs, item]);
		ipcRenderer.send('logs:add', item);
		showAlert('Successfully added');
	}
	function showAlert(message, variant = 'success', seconds = 3000) {
		setAlert({
			show: true,
			message,
			variant,
		});
		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'succ',
			});
		}, seconds);
	}
	function deleteItem(_id) {
		// setLogs(logs.filter((item) => item._id != _id));
		ipcRenderer.send('logs:delete', _id);
		showAlert('Item Successfully deleted', 'success');
	}
	return (
		<Container>
			<AddLogItem addItem={addItem} />
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{logs?.map((log) => (
						<LogItem key={log._id} log={log} deleteItem={deleteItem} />
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default App;
