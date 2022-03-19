export default class Project {
	constructor(title) {
		this.title = title;

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

	deleteTask(taskToRemove) {
		this.tasks.forEach((task) => {
			let count = 0;
			if (task.title === taskToRemove) {
				this.tasks.splice(count, 1);
			}
			count += 1;
		});
	}
	clearAllTasks() {
		this.tasks = [];
	}
}
