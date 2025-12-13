import LocalStorageTaskRepository from "./repositories/LocalStorageTaskRepository"
import TaskService from "./service/TaskService";
import MongoDbTaskRepository from "./repositories/MongoDBTaskRepository";

const taskContainer = document.getElementById('taskContainer')
const doneTaskContainer = document.getElementById('doneTaskContainer')
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const taskAddBtn = document.getElementById('taskAddBtn')

const localStorageTaskRepository = new LocalStorageTaskRepository()
const mongoDBtaskRep = new MongoDbTaskRepository()
const taskService = new TaskService(taskContainer, mongoDBtaskRep, taskInput, taskAddBtn, doneTaskContainer)


void taskService.init();








