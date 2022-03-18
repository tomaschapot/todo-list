export default class Task {
	//Function Constructor
	constructor(title, description, dueDate = "No Date", priority) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = false;
	}

	//Setting up the methods

	completeTask() {
		this.status = true;
	}

	setTitle(title) {
		this.title = title;
	}

	getTitle() {
		return this.title;
	}

	setDescription(description) {
		this.description = description;
	}

	getDescription() {
		return this.description;
	}

	setdueDate(dueDate) {
		this.dueDate = dueDate;
	}

	getDueDate() {
		return this.dueDate;
	}

	setPriority(priority) {
		this.priority = priority;
	}

	getPriority() {
		return this.priority;
	}

	setStatus(status) {
		this.status = status;
	}

	getStatus() {
		return this.status;
	}
}
