import {MongoDBTaskRepositoryInterface, UpdateTaskPayLoad} from "./TaskRepositoryInterface";
import {Task} from "../models/TaskModel";
import axios from "axios";

export default class MongoDbTaskRepository implements MongoDBTaskRepositoryInterface {
    constructor() {}


    async getAll(): Promise<Task[]> {
        const response = await axios.get('http://localhost:5000/api/tasks')
        return response.data
    }

    async getCurrentTasks(): Promise<Task[]> {
        const response = await axios.get('http://localhost:5000/api/tasks/pending')
        return response.data
    }

    async getDoneTasks(): Promise<Task[]> {
        const response = await axios.get('http://localhost:5000/api/tasks/done')
        return response.data
    }

    async add(title: string) {
        await axios.post(`http://localhost:5000/api/tasks/create`, {
            title: title
        })
    }

    async remove(id: string) {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`)
    }

    async updateTitle(id: string, newTitle: string) {
        await axios.patch(`http://localhost:5000/api/tasks/${id}/title`, {
            newTitle: newTitle
        })
    }

    async updateStatus(id: string, newStatus: boolean) {
        await axios.patch(`http://localhost:5000/api/tasks/${id}/status`, {
            newStatus: newStatus
        })
    }
}