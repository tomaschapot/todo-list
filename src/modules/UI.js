import Task from "./Tasks.js";
import Project from "./Project.js";

const $addTask = document.querySelector("#add-task");
const $clearAll = document.querySelector("#clear-task");
const tasksContainer = document.querySelector(".project-grid");
const $firstAddButton = document.querySelector("#add-button");
let defaultProject = new Project("Default");
let completedTasks = new Project("Completed");

class DOM {
	static initializeEventListeners() {
		$addTask.addEventListener("click", () => {
			DOM.createTaskInput();
			DOM.removeFirstAddButton();
		});
		$clearAll.addEventListener("click", () => {
			DOM.removeAllTasks();
			DOM.displayFirstAddButton();
		});
		$firstAddButton.addEventListener("click", () => {
			DOM.createTaskInput();
			DOM.removeFirstAddButton();
		});
		//Event Delegation for Dynamically Generated Elements
		tasksContainer.addEventListener("mouseover", function (e) {
			if (e.target.classList[2] === "task-status") {
				DOM.changeStatusToCompleted(e);
			}
		});
		tasksContainer.addEventListener("mouseout", function (e) {
			if (e.target.classList[2] === "task-status") {
				DOM.changeStatusToPending(e);
			}
		});

		tasksContainer.addEventListener("click", function (event) {
			if (event.target.classList[1] == "button-delete") {
				DOM.cancelTaskInput();
			}
			if (event.target.classList[1] == "button-create") {
				DOM.displayCreatedTask();
				DOM.cancelTaskInput();
			}
			if (event.target.classList[2] === "task-status") {
				DOM.removeTask(event);
				console.log(tasksContainer.childElementCount);
				if (tasksContainer.childElementCount === 0) {
					DOM.displayFirstAddButton();
				}
			}
		});
		tasksContainer.addEventListener("dragstart", (event) => {
			if ((event.target.draggable = "true")) {
				event.target.classList.add("dragging");
			}
		});
		tasksContainer.addEventListener("dragend", (event) => {
			if ((event.target.draggable = "true")) {
				event.target.classList.remove("dragging");
			}
		});
		tasksContainer.addEventListener("dragover", (event) => {
			event.preventDefault();
			DOM.createTaskDrag(event);
		});
	}

	static displayFirstAddButton() {
		$firstAddButton.style.display = "block";
	}
	static removeFirstAddButton() {
		$firstAddButton.style.display = "none";
	}
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
			description.placeholder = "Description";
			description.classList.add("task-textarea");

			let iconsContainer = document.createElement("div");
			iconsContainer.classList.add("task-resources");

			let dateInput = document.createElement("input");
			dateInput.type = "date";
			dateInput.classList.add("task-date");

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
			iconsContainer.append(proyectIcon, dateInput);
			buttonsContainer.append(createButton, deleteButton);
		}
	}

	static getDragAfterElement(container, y) {
		const draggableItems = [
			...container.querySelectorAll(".task-container:not(.dragging)"), //get all tasks except the one currently dragging
		];

		return draggableItems.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect(); //Rectangle and position of each task
				const offset = y - box.top - box.height / 2;

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
			}
		).element;
	}
	static createTaskDrag(event) {
		const afterElement = DOM.getDragAfterElement(tasksContainer, event.clientY);

		console.log(afterElement);

		let draggable = document.querySelector(".dragging");
		if (afterElement === undefined) {
			tasksContainer.appendChild(draggable);
		} else {
			tasksContainer.insertBefore(draggable, afterElement);
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
		defaultProject.clearAllTasks();
	}

	static removeTask(e) {
		let currentTaskContainer = e.target.closest(".task-container");
		let currentTask = e.target.closest(".task");
		let currentTaskTitle = currentTask.querySelector(".task-title").textContent;

		currentTaskContainer.remove();
		defaultProject.deleteTask(currentTaskTitle);
	}

	static createTaskfromInput() {
		const title = document.querySelector(".task-input");
		const titleValue = title.value;
		const description = document.querySelector(".task-textarea");
		const descriptionValue = description.value;
		const dueDate = document.querySelector(".task-date");
		const dueDateValue = dueDate.value;
		let task = new Task(titleValue, descriptionValue, dueDateValue);
		defaultProject.addTask(task);

		return task;
	}

	static onDragStart(event) {
		event.currentTarget.style.backgroundColor = "red";
	}

	static displayCreatedTask() {
		let createdTask = DOM.createTaskfromInput();
		let container = document.createElement("div");
		container.classList.add("task-container");
		container.draggable = "true";
		container.id = Date.now();

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

		let dateIcon = document.createElement("p");
		dateIcon.textContent = `Due Date: ${createdTask.getDueDate()}`;
		dateIcon.classList.add("task-date");

		let proyectIcon = document.createElement("i");
		proyectIcon.classList.add("fa-solid", "fa-list-check");

		//Append Elements
		tasksContainer.appendChild(container);
		container.appendChild(task);

		task.append(titleContainer, description, iconsContainer);
		titleContainer.append(statusIcon, title);
		iconsContainer.append(proyectIcon, dateIcon);
	}
	static changeStatusToCompleted(e) {
		e.target.classList.replace("fa-circle", "fa-circle-check");
	}
	static changeStatusToPending(e) {
		e.target.classList.replace("fa-circle-check", "fa-circle");
	}
}

//Event Listeners

DOM.initializeEventListeners();
