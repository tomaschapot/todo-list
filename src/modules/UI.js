import Task from "./Tasks.js";
import Project from "./Project.js";

class DOM {
	static createTask() {
		let container = document.createElement("div");
		container.classList.add("task");
	}
}
