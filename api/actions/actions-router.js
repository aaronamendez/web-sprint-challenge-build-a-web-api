// Write your "actions" router here!
// Write your "projects" router here!
const express = require('express');
const actionsRouter = express.Router();
const Actions = require('./actions-model');
const { validateId, validateBody } = require('./actions-middlware');

actionsRouter.get('/', async (req, res) => {
	try {
		Actions.get().then((actions) => {
			res.status(200).json(actions);
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

actionsRouter.get('/:id', validateId, async (req, res) => {
	try {
		res.status(200).json(req.action);
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

actionsRouter.post('/', validateBody, async (req, res) => {
	try {
		Actions.get(req.actionBody.project_id).then((exists) => {
			if (exists) {
				// Continue ...
				Actions.insert(req.actionBody).then((newAction) => {
					res.status(201).json(newAction);
				});
			} else {
				res.status(404).json({ message: "That project doesn't exist!" });
			}
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

actionsRouter.put('/:id', validateId, validateBody, async (req, res) => {
	try {
		Actions.update(req.action.id, req.actionBody).then((updated) => {
			res.status(200).json(updated);
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

actionsRouter.delete('/:id', validateId, async (req, res) => {
	try {
		Actions.remove(req.action.id).then((deleted) => {
			res.status(200).json(deleted);
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

module.exports = actionsRouter;
