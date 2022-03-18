export default class Project {
	constructor(title, category) {
		this.title = title;
		this.category = category;
		this.tasks = []; // Empty array to push the tasks on
	}

	setTitle(title) {
		this.title = title;
	}
	getTitle() {
		return this.title;
	}
	setCategory(category) {
		this.category = category;
	}
	getCategory() {
		return this.category;
	}

	setTasks(tasks) {
		this.tasks = tasks;
	}

	getTasks() {
		return this.tasks;
	}

	addTask(newTask) {
		if (this.tasks.includes(newTask)) {
			return;
		} else {
			this.tasks.push(newTask);
		}
	}

	deleteTask(task) {
		if (this.tasks.includes(task)) {
			let index = this.tasks.indexOf(task);
			this.tasks.splice(index, 1);
		}
	}
}

//Task Formatter

function capitalizeTask(task) {
	let lowerCaseTask = task.toLowerCase();
	let capitalizedTask =
		lowerCaseTask.charAt(0).toUpperCase() + lowerCaseTask.slice(1);

	return capitalizedTask;
}
