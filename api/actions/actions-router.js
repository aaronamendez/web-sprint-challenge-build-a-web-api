// Write your "actions" router here!
// Write your "projects" router here!
const express = require('express');
const actionsRouter = express.Router();
const Actions = require('./actions-model');

actionsRouter.get('/', async (req, res) => {
	try {
		Actions.get().then((projects) => {
			res.status(200).json(projects);
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

module.exports = actionsRouter;
