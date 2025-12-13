import {v4 as uuidv4} from '../../node_modules/uuid/dist'
import {TaskRepositoryInterface, UpdateTaskPayLoad} from "./TaskRepositoryInterface";
import {Task} from "../models/TaskModel";

export default class LocalStorageTaskRepository implements TaskRepositoryInterface {
    constructor() {
    }

    getAll(): Task[] {
        return this.getParsedTasks()
    }

    getCurrentTasks(): Task[] {
        return this.getParsedTasks().filter(t => !t.isDone)
    }

    getDoneTasks(): Task[] {
        return this.getParsedTasks().filter(t => t.isDone)
    }

    add(title: string): void {
        const tasks: Task[] = this.getParsedTasks() //получаем из LocalStorage список задач в формате JSON или пустой массив, если задач нет
        const newTask: Task = {
            id: uuidv4(),
            title,
            isDone: false,
        }
        tasks.push(newTask)
        const updatedTasksJSON = this.getStringifiedItem(tasks)
        localStorage.setItem('tasks', updatedTasksJSON)
    }

    remove(id: string): void {
        const tasks = this.getParsedTasks()
        const hasDeletingTask: boolean = tasks.some((task: Task) => task.id === id)

        if (!hasDeletingTask) {
            console.log("Задача с указанным ID не найдена")
            return
        }

        const updatedTasks = tasks.filter(task => task.id !== id)

        localStorage.setItem('tasks', this.getStringifiedItem(updatedTasks))
    }

    updateTitle(id: string, newTaskPayLoad: UpdateTaskPayLoad): void {
        const tasks = this.getParsedTasks()
        const taskToUpdate = tasks.find(task => task.id === id)

        if (!taskToUpdate) {
            console.log("Задача с указанным ID не найдена")
            return
        }

        taskToUpdate.title = newTaskPayLoad.title
        localStorage.setItem('tasks', this.getStringifiedItem(tasks))
    }

    updateStatus(id: string, newStatus: boolean) {
        const tasks = this.getParsedTasks()
        const taskToUpdate = tasks.find(task => task.id === id)

        if (!taskToUpdate) {
            console.log("Задача с указанным ID не найдена")
            return
        }

        taskToUpdate.isDone = newStatus
        localStorage.setItem('tasks', this.getStringifiedItem(tasks))
    }

    private getParsedTasks(): Task[] {
        return JSON.parse(localStorage.getItem('tasks') || '[]')
    }

    private getStringifiedItem<T>(item: T): string {
        return JSON.stringify(item)
    }
}