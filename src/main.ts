import LocalStorageTaskRepository from './repositories/LocalStorageTaskRepository'
import TaskService from './service/TaskService'
import MongoDBTaskRepository from "./repositories/MongoDBTaskRepository";
import LoaderService from "./service/LoaderService";
import {FullscreenLoader} from "./components/FullscreenLoader";

const taskContainer = document.getElementById('taskContainer')
const doneTasksContainer = document.getElementById('doneTasksContainer')
const taskInput: HTMLInputElement | null = document.getElementById('taskInput') as HTMLInputElement
const taskAddBtn = document.getElementById('taskAddBtn')

const localStorageTaskRepository = new LocalStorageTaskRepository()
const mongoDBTaskRep = new MongoDBTaskRepository()
const loaderService = new LoaderService(FullscreenLoader())

const taskService = new TaskService(taskContainer, mongoDBTaskRep, taskInput, taskAddBtn, doneTasksContainer, loaderService)

void taskService.init()

localStorageTaskRepository.updateStatus('68bfbcad-d5a0-4d13-bbd3-e4f3108b50f0', true)
// MVC
// Model - TaskModel
// View - TaskComponent
// Controller - main.ts

