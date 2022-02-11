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
		const { name, description } = req.body;

		if (name && description) {
			const obj = {
				name,
				description,
			};
			Projects.insert(obj).then((project) => {
				res.status(200).json(project);
			});
		} else {
			res.status(400).json({ message: 'Name and Description are required!' });
		}
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

module.exports = projectsRouter;
