import {Task} from "../models/TaskModel";

export interface UpdateTaskPayLoad {
    title: string
}

export interface TaskRepositoryInterface {
    get(id: string): Task | undefined
    getAll(): Task[]
    getCurrentTasks(): Task[]
    getDoneTasks(): Task[]
    add(title: string): void
    remove(id: string): void
    updateTitle(id: string, updateTaskPayLoad: UpdateTaskPayLoad): void
    updateStatus(id: string, newStatus: boolean): void
}