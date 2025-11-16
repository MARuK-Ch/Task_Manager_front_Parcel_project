import {TaskRepositoryInterface} from "../repositories/TaskRepositoryInterface";
import {Task} from "../models/TaskModel";
import TaskComponent from "../components/TaskComponent";

export default class TaskService {
    private taskContainer: HTMLElement | null
    private repository: TaskRepositoryInterface
    private taskInput: HTMLInputElement | null
    private taskAddBtn: HTMLElement | null
    private doneTaskContainer: HTMLElement | null

    constructor(
        taskContainer: HTMLElement | null,
        repository: TaskRepositoryInterface,
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

    renderCurrentTasks(){
        if (this.taskContainer) {
            const currentTasks = this.repository.getCurrentTasks()

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

    renderDoneTasks() {
        if (this.doneTaskContainer) {
            const doneTasks = this.repository.getDoneTasks()

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

    createAddTaskEvent(): void {
        if (this.taskAddBtn) {
            this.taskAddBtn?.addEventListener('click', (): void => {
                const newTaskTitle: string | undefined = this.taskInput?.value?.trim()

                if (newTaskTitle) {
                    this.repository.add(newTaskTitle)
                    this.renderCurrentTasks()
                }
            })
        }
    }

    deleteTask(id: string): void {
        this.repository.remove(id)

        const task = this.repository.get(id)
        if (task?.isDone) {
            this.renderDoneTasks()
        }
        else {
            this.renderCurrentTasks()
        }
    }

    updateTask(id: string, newTitle: string) {
        this.repository.updateTitle(id, { title: newTitle })
        this.renderCurrentTasks()
        this.renderDoneTasks()
    }

    updateStatus(id: string, newStatus: boolean) {
        this.repository.updateStatus(id, newStatus)

        this.renderDoneTasks()
        this.renderCurrentTasks()
    }
}
