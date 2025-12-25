import {v4 as uuidv4} from '../../node_modules/uuid/dist'
import {TaskRepositoryInterface, UpdateTaskPayload} from "./TaskRepositoryInterface";
import {Task} from "../models/TaskModel";

// Repository - Откуда получать данные и что с ними можно делать
export default class LocalStorageTaskRepository implements TaskRepositoryInterface {
    constructor() {}

    getAll() {
        return this.getParsedTasks()
    }
    getDoneTasks() {
        return this.getParsedTasks().filter(t => t.isDone)
    }
    getCurrentTasks() {
        return this.getParsedTasks().filter(t => !t.isDone)
    }
    add(title: string) {
        // localStorage.getItem('tasks') => "[{ "id": 1, "title": "Task 1" }, { "id": 2, "title": "Task 2" }]"
        // JSON.parse() => [{ "id": 1, "title": "Task 1" }, { "id": 2, "title": "Task 2" }]
        // localStorage.getItem('tasks') === null => '[]'
        // tasks = [{ "id": 1, "title": "Task 1" }, { "id": 2, "title": "Task 2" }] || []
        // tasks = [{ "id": 1, "title": "Task 1" }, { "id": 2, "title": "Task 2" }, { "id": 3, "title": "Task 3" }]
        // updatedTasksJson => JSON.stringify(tasks) => "[{ "id": 1, "title": "Task 1" }, { "id": 2, "title": "Task 2" }, { "id": 3, "title": "Task 3" }]"
        // localStorage.setItem('tasks', updatedTasksJson) => "[{ "id": 1, "title": "Task 1" }, { "id": 2, "title": "Task 2" }, { "id": 3, "title": "Task 3" }]"
        const tasks = this.getParsedTasks()
        const newTask: Task = {
            id: uuidv4(),
            title,
            isDone: false,
        }

        tasks.push(newTask)
        const updatedTasksJson = this.getStringifiedItem(tasks)
        localStorage.setItem('tasks', updatedTasksJson)

        // serialization - Сериализация - процесс конвертирования данных из базы
        // python -> dict
        // js -> object
        // java -> hashmap
        // c# -> dictionary
    }
    remove(id: string) {
        const tasks = this.getParsedTasks()
        const hasDeletingTask = tasks.some((task) => task.id === id)

        if (!hasDeletingTask) {
            console.log('Невозможно удалить Неправильный ID')
            return
        }

        const updatedTasks = tasks.filter(task => task.id !== id)
        localStorage.setItem('tasks', this.getStringifiedItem(updatedTasks))
    }
    updateTitle(id: string, newTaskPayload: UpdateTaskPayload) {
        const tasks = this.getParsedTasks()
        const taskToUpdate = tasks.find(task => task.id === id)

        if (!taskToUpdate) {
            console.log('Задача не найдена. Невозможно обновить')
            return
        }

        taskToUpdate.title = newTaskPayload.title
        localStorage.setItem('tasks', this.getStringifiedItem(tasks))
    }
    updateStatus(id: string, newStatus: boolean) {
        const tasks = this.getParsedTasks()
        const taskToUpdate = tasks.find(task => task.id === id)

        if (!taskToUpdate) {
            console.log('Задача не найдена. Невозможно обновить')
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
