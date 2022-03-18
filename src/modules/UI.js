import Task from "./Tasks.js";
import Project from "./project.js";

let newTask = new Task("Tarea", "Se hace la tarea", "Hoy", "Friday");

let projecto = new Project("La cena", "Familiar");

let task2 = new Task("asdasd", "asda", "asd", "a");

projecto.addTask(newTask);
projecto.addTask(newTask);

console.log(projecto.getTasks());
