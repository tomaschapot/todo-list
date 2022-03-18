import Task from "./Tasks.js";
import Project from "./Project.js";

const $addTask = document.querySelector("#add-task");
const $clearAll = document.querySelector("#clear-task");
const tasksContainer = document.querySelector(".project-grid");
let defaultProject = new Project("default", "default");

class DOM {
	static createTaskInput() {
		//Create Elements

		if (tasksContainer.querySelector("#task-input") === null) {
			let container = document.createElement("div");
			container.classList.add("task-container");
			container.id = "task-input";

			let task = document.createElement("div");
			task.classList.add("task");

			let title = document.createElement("input");
			title.placeholder = "Por ej. Reunion de Trabajo 11pm";
			title.classList.add("task-input", "title-container", "task-resources");

			let description = document.createElement("textarea");
			title.description = "Description";
			description.classList.add("task-textarea");

			let iconsContainer = document.createElement("div");
			iconsContainer.classList.add("task-resources");

			let dateIcon = document.createElement("i");
			dateIcon.classList.add("fa-solid", "fa-calendar-days");

			let proyectIcon = document.createElement("i");
			proyectIcon.classList.add("fa-solid", "fa-list-check");

			let buttonsContainer = document.createElement("div");
			buttonsContainer.classList.add("create-delete-buttons");

			let createButton = document.createElement("button");
			createButton.textContent = "Create";
			createButton.classList.add("button", "button-create");

			let deleteButton = document.createElement("button");
			deleteButton.textContent = "Cancel";
			deleteButton.classList.add("button", "button-delete");

			//Append Elements
			tasksContainer.appendChild(container);
			container.append(task, buttonsContainer);
			task.append(title, description, iconsContainer);
			iconsContainer.append(dateIcon, proyectIcon);
			buttonsContainer.append(createButton, deleteButton);
		}
	}
	static cancelTaskInput() {
		let taskInput = tasksContainer.querySelector("#task-input");
		if (taskInput !== null) {
			taskInput.remove();
		}
	}

	static removeAllTasks() {
		while (tasksContainer.firstChild) {
			tasksContainer.removeChild(tasksContainer.firstChild);
		}
	}
	static removeTask(e) {
		let currentTask = e.target.closest(".task");
		currentTask.remove();
	}

	static initializeEventListeners() {
		$addTask.addEventListener("click", DOM.createTaskInput);
		$clearAll.addEventListener("click", DOM.removeAllTasks);

		//Event Delegation for Dynamically Generated Elements

		tasksContainer.addEventListener("click", function (event) {
			if (event.target.classList[1] == "button-delete") {
				DOM.cancelTaskInput();
			}
			if (event.target.classList[1] == "button-create") {
				DOM.displayCreatedTask();
				DOM.cancelTaskInput();
			}
			if (event.target.classList[2] === "task-status") DOM.removeTask(event);
		});
	}

	static createTaskfromInput() {
		const title = document.querySelector(".task-input");
		const titleValue = title.value;
		const description = document.querySelector(".task-textarea");
		const descriptionValue = description.value;

		return new Task(titleValue, descriptionValue);
	}

	static displayCreatedTask() {
		let createdTask = DOM.createTaskfromInput();
		let container = document.createElement("div");
		container.classList.add("task-container");

		let task = document.createElement("div");
		task.classList.add("task");

		let titleContainer = document.createElement("div");
		titleContainer.classList.add("title-container", "task-resources");
		let statusIcon = document.createElement("i");
		statusIcon.classList.add("fa-regular", "fa-circle", "task-status");
		let title = document.createElement("h4");
		title.classList.add("task-title");
		title.textContent = createdTask.getTitle();

		let description = document.createElement("p");
		description.classList.add("task-desc");
		description.textContent = createdTask.getDescription();

		let iconsContainer = document.createElement("div");
		iconsContainer.classList.add("task-resources");

		let dateIcon = document.createElement("i");
		dateIcon.classList.add("fa-solid", "fa-calendar-days");

		let proyectIcon = document.createElement("i");
		proyectIcon.classList.add("fa-solid", "fa-list-check");

		//Append Elements
		tasksContainer.appendChild(container);
		container.appendChild(task);

		task.append(titleContainer, description, iconsContainer);
		titleContainer.append(statusIcon, title);
		iconsContainer.append(dateIcon, proyectIcon);
	}
}

//Event Listeners

DOM.initializeEventListeners();
