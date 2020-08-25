const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const Colors = require("./utils/Colors");

const app = express();

function logRequest(request, response, next) {
	const { method, url } = request;

	const logLabel = `[${method}] ${Colors.Reset} ${url}`;

	console.time("Time");

	next();

	const bgColor = {
		GET: Colors.bg.Cyan,
		POST: Colors.bg.Green,
		PUT: Colors.bg.Yellow,
		DELETE: Colors.bg.Red,
	};

	console.log(bgColor[method], logLabel);
	console.timeEnd("Time");
}

function validateRepositoryId(request, response, next) {
	const { id } = request.params;

	if (!isUuid(id)) {
		return response.status(400).json({
			error: "Invalid repository Id!",
		});
	}

	return next();
}

app.use("/repositories/:id", validateRepositoryId);
app.use(logRequest);
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
	const { title, url, techs } = request.body;

	const repository = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(repository);

	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).json({
			error: "Repository does not exists!",
		});
	}

	const repository = {
		...repositories[repositoryIndex],
		title,
		url,
		techs,
	};

	repositories[repositoryIndex] = repository;

	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).json({
			error: "Repository does not exists!",
		});
	}

	repositories.splice(repositoryIndex, 1);

	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).json({
			error: "Repository does not exists!",
		});
	}

	repositories[repositoryIndex].likes += 1;
	const repository = repositories[repositoryIndex];

	return response.json(repository);
});

module.exports = app;
