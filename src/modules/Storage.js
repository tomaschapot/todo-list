export default class LocalStorage {
	static setTask(task) {
		localStorage.setItem(task.title, JSON.stringify(task));
	}
	static getTask(taskTitle) {
		return JSON.parse(localStorage.getItem(taskTitle));
	}
	static removeTask(taskTitle) {
		localStorage.removeItem(taskTitle);
	}
}
