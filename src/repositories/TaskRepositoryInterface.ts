import {Task} from "../models/TaskModel";

export interface UpdateTaskPayload {
    title: string
}

export interface TaskRepositoryInterface {
    getAll(): Task[]
    getDoneTasks(): Task[]
    getCurrentTasks(): Task[]
    add(title: string): void
    remove(id: string): void
    updateTitle(id: string, updateTaskPayload: UpdateTaskPayload): void
    updateStatus(id: string, newStatus: boolean): void
}

export interface MongoDBTaskRepositoryInterface {
    getAll(): Promise<Task[]>
    getDoneTasks(): Promise<Task[]>
    getCurrentTasks(): Promise<Task[]>
    add(title: string): Promise<void>
    remove(id: string): Promise<void>
    updateTitle(id: string, newTitle: string): Promise<void>
    updateStatus(id: string, newStatus: boolean): Promise<void>
}
