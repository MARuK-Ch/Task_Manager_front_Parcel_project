import {Task} from "../models/TaskModel";
import TaskComponent from "../components/TaskComponent";
import MongoDbTaskRepository from "../repositories/MongoDBTaskRepository";
import LocalStorageTaskRepository from "../repositories/LocalStorageTaskRepository";

export default class TaskService {
    private taskContainer: HTMLElement | null
    private taskAddBtn: HTMLElement | null
    private taskInput: HTMLInputElement | null
    private repository: MongoDbTaskRepository
    private doneTaskContainer: HTMLElement | null

    constructor(
        taskContainer: HTMLElement | null,
        repository: MongoDbTaskRepository,
        taskInput: HTMLInputElement | null,
        taskAddBtn: HTMLElement | null,
        doneTaskContainer: HTMLElement | null
    ) {
        this.taskContainer = taskContainer
        this.repository = repository
        this.taskInput = taskInput
        this.taskAddBtn = taskAddBtn
        this.doneTaskContainer = doneTaskContainer
    }

    async init() {
        await this.renderCurrentTasks()
        await this.renderDoneTasks()
        this.createAddTaskEvent()
    }

    async renderCurrentTasks(){
        if (this.taskContainer) {
            const currentTasks = await this.repository.getCurrentTasks()

            let currentTasksHtml: HTMLElement[] = []

            currentTasks.forEach((task: Task): void => {
                currentTasksHtml.push(
                    TaskComponent({
                        title: task.title,
                        isDone: task.isDone,
                        deleteTask: () => this.deleteTask(task.id),
                        updateTask: (newTitle: string) => this.updateTask(task.id, newTitle),
                        updateStatus: (newStatus: boolean) =>   this.updateStatus(task.id, newStatus),
                }))
            })

            this.taskContainer.innerHTML = ''

            if (currentTasksHtml.length > 0) {
                this.taskContainer.append(...currentTasksHtml)
            }
            else {
                this.taskContainer.innerHTML = '<div>Нет задач</div>'
            }
        }
    }

    async renderDoneTasks() {
        if (this.doneTaskContainer) {
            const doneTasks = await this.repository.getDoneTasks()

            let doneTasksHtml: HTMLElement[] = []

            doneTasks.forEach((task: Task): void => {
                doneTasksHtml.push(
                    TaskComponent({
                        title: task.title,
                        isDone: task.isDone,
                        deleteTask: () => this.deleteTask(task.id),
                        updateTask: (newTitle: string) => this.updateTask(task.id, newTitle),
                        updateStatus: (newStatus: boolean) =>   this.updateStatus(task.id, newStatus),
                    }))
            })

            this.doneTaskContainer.innerHTML = ''

            if (doneTasksHtml.length > 0) {
                this.doneTaskContainer.append(...doneTasksHtml)
            }
            else {
                this.doneTaskContainer.innerHTML = '<div>Нет задач</div>'
            }
        }
    }

    createAddTaskEvent() {
        if (this.taskAddBtn) {
            this.taskAddBtn?.addEventListener('click', async () => {
                const newTaskTitle = this.taskInput?.value?.trim()

                if (newTaskTitle) {
                    await this.repository.add(newTaskTitle)
                    await this.renderCurrentTasks()
                }
            })
        }
    }

    async deleteTask(id: string) {
        await this.repository.remove(id)
        await this.renderDoneTasks()
        await this.renderCurrentTasks()
    }

    async updateTask(id: string, newTitle: string) {
        await this.repository.updateTitle(id, newTitle)
        await this.renderCurrentTasks()
        await this.renderDoneTasks()
    }

    async updateStatus(id: string, newStatus: boolean) {
        await this.repository.updateStatus(id, newStatus)
        await this.renderDoneTasks()
        await this.renderCurrentTasks()
    }
}
