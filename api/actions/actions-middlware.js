// add middlewares here related to actions
const Actions = require('./actions-model');

const validateId = async (req, res, next) => {
	const { id } = req.params;
	Actions.get(id).then((action) => {
		if (action) {
			req.action = action;
			next();
		} else {
			res.status(404).json({ message: 'No action found!' });
		}
	});
};

const validateBody = async (req, res, next) => {
	const { description, notes, completed, project_id } = req.body;
	if (description && notes && project_id && completed !== undefined) {
		req.actionBody = req.body;
		next();
	} else {
		res.status(400).json({ message: 'Invalid Body!' });
	}
};

module.exports = { validateId, validateBody };
