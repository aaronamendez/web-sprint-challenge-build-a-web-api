// Write your "projects" router here!
const express = require('express');
const projectsRouter = express.Router();
const Projects = require('./projects-model');

projectsRouter.get('/', async (req, res) => {
	try {
		Projects.get().then((projects) => {
			res.status(200).json(projects);
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

projectsRouter.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		Projects.get(id).then((project) => {
			if (project !== null) {
				res.status(200).json(project);
			} else {
				res.status(404).json('Project Not Found');
			}
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

projectsRouter.post('/', async (req, res) => {
	try {
		const { name, description, completed } = req.body;

		if (name && description) {
			const obj = {
				name,
				description,
				completed,
			};
			Projects.insert(obj).then((project) => {
				res.status(201).json(project);
			});
		} else {
			res.status(400).json({ message: 'Name and Description are required!' });
		}
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

projectsRouter.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, completed } = req.body;

		Projects.get(id).then((project) => {
			if (project) {
				if (name && description && completed !== undefined) {
					const obj = {
						name,
						description,
						completed,
					};
					Projects.update(project.id, obj).then((updated) => {
						res.status(200).json(updated);
					});
				} else {
					res
						.status(400)
						.json({ message: 'Name and Description are required!' });
				}
			} else {
				res.status(400).json({ message: 'No Project Found' });
			}
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

projectsRouter.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		Projects.get(id).then((project) => {
			if (project) {
				Projects.remove(project.id).then((removed) => {
					res.status(200).json(removed);
				});
			} else {
				res.status(404).json({ message: 'Project Not Found' });
			}
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

projectsRouter.get('/:id/actions', async (req, res) => {
	try {
		const { id } = req.params;
		Projects.get(id).then((project) => {
			if (project) {
				// Continue
				Projects.getProjectActions(project.id).then((actions) => {
					res.status(200).json(actions);
				});
			} else {
				res.status(404).json({ message: 'Not found!' });
			}
		});
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

module.exports = projectsRouter;
