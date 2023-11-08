/* 
Filename: complex_code.js

This code is a complex implementation of a task management system.
It handles tasks, their dependencies, priority, and progress tracking.

*/

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.dependencies = [];
    this.completed = false;
  }

  addDependency(task) {
    this.dependencies.push(task);
  }

  markCompleted() {
    this.completed = true;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getUncompletedTasks() {
    return this.tasks.filter((task) => !task.completed);
  }

  getTaskByName(name) {
    return this.tasks.find((task) => task.name === name);
  }

  markTaskCompleted(name) {
    const task = this.getTaskByName(name);
    if (task) {
      task.markCompleted();

      // Mark dependencies as completed if all their dependencies are completed
      task.dependencies.forEach((dependency) => {
        if (dependency.dependencies.every((dep) => dep.completed)) {
          dependency.markCompleted();
        }
      });
    }
  }
}

// Usage example
const task1 = new Task('Task 1', 3);
const task2 = new Task('Task 2', 2);
const task3 = new Task('Task 3', 1);
const task4 = new Task('Task 4', 4);

task2.addDependency(task1);
task3.addDependency(task1);
task4.addDependency(task2);
task4.addDependency(task3);

const taskManager = new TaskManager();
taskManager.addTask(task1);
taskManager.addTask(task2);
taskManager.addTask(task3);
taskManager.addTask(task4);

taskManager.markTaskCompleted('Task 1');

console.log(taskManager.getUncompletedTasks());