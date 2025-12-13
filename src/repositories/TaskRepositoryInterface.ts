import {Task} from "../models/TaskModel";

export interface UpdateTaskPayLoad {
    title: string
}

export interface TaskRepositoryInterface {
    getAll(): Task[]
    getCurrentTasks(): Task[]
    getDoneTasks(): Task[]
    add(title: string): void
    remove(id: string): void
    updateTitle(id: string, updateTaskPayLoad: UpdateTaskPayLoad): void
    updateStatus(id: string, newStatus: boolean): void
}

export interface MongoDBTaskRepositoryInterface {
    getAll(): Promise<Task[]>
    getCurrentTasks(): Promise<Task[]>
    getDoneTasks(): Promise<Task[]>
    add(title: string): Promise<void>
    remove(id: string): Promise<void>
    updateTitle(id: string, newTitle: string): Promise<void>
    updateStatus(id: string, newStatus: boolean): Promise<void>
}