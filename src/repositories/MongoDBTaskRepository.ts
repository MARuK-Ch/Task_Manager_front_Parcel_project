import {MongoDBTaskRepositoryInterface, UpdateTaskPayload} from "./TaskRepositoryInterface";
import {Task} from "../models/TaskModel";
import axios from "axios";

const BASE_URL = `${process.env.API_URL}/api/tasks` || 'http://localhost:5000/api/tasks'

export default class MongoDBTaskRepository implements MongoDBTaskRepositoryInterface {
    async getAll(): Promise<Task[]> {
        const response = await axios.get(BASE_URL)
        return response.data
    }
    async getDoneTasks(): Promise<Task[]> {
        const response = await axios.get(`${BASE_URL}/done`)
        return response.data
    }
    async getCurrentTasks(): Promise<Task[]> {
        const response = await axios.get(`${BASE_URL}/pending`)
        return response.data
    }
    async add(title: string) {
        await axios.post(BASE_URL, {
            title: title
        })
    }
    async remove(id: string) {
        await axios.delete(`${BASE_URL}/${id}`)
    }
    async updateTitle(id: string, newTitle: string) {
        await axios.patch(`${BASE_URL}/{id}/title`, {
            newTitle: newTitle
        })
    }
    async updateStatus(id: string, newStatus: boolean) {
        await axios.patch(`${BASE_URL}/${id}/status`, {
            newStatus: newStatus
        })
    }
}
