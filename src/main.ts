import LocalStorageTaskRepository from "./repositories/LocalStorageTaskRepository"
import TaskService from "./service/TaskService";

const taskContainer = document.getElementById('taskContainer')
const doneTaskContainer = document.getElementById('doneTaskContainer')
const taskInput: HTMLInputElement | null = document.getElementById('taskInput') as HTMLInputElement
const taskAddBtn = document.getElementById('taskAddBtn')

const localStorageTaskRepository = new LocalStorageTaskRepository()
const taskService = new TaskService(taskContainer, localStorageTaskRepository, taskInput, taskAddBtn, doneTaskContainer)


taskService.renderCurrentTasks()
taskService.renderDoneTasks()
taskService.createAddTaskEvent()










