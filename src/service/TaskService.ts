import {TaskRepositoryInterface} from '../repositories/TaskRepositoryInterface'
import TaskComponent from '../components/TaskComponent'
import MongoDBTaskRepository from "../repositories/MongoDBTaskRepository";
import {LoaderServiceInterface} from "./LoaderService";

// Service/Controller - Что и как делать с данными (бизнес логика)
export default class TaskService {
  private taskContainer: HTMLElement | null
  private taskAddBtn: HTMLElement | null
  private taskInput: HTMLInputElement | null
  private repository: MongoDBTaskRepository
  private doneTasksContainer: HTMLElement | null
  private loaderService: LoaderServiceInterface

  constructor(
      taskContainer: HTMLElement | null,
      repository: MongoDBTaskRepository,
      taskInput: HTMLInputElement | null,
      taskAddBtn: HTMLElement | null,
      doneTasksContainer: HTMLElement | null,
      loaderService: LoaderServiceInterface
  ) {
    this.taskContainer = taskContainer
    this.repository = repository
    this.taskInput = taskInput
    this.taskAddBtn = taskAddBtn
    this.doneTasksContainer = doneTasksContainer
    this.loaderService = loaderService
  }

  async init() {
      await this.renderLoader()
      await this.renderCurrentTasks()
      await this.renderDoneTasks()
      this.createAddTaskEvent()
  }

  async renderLoader() {
      this.loaderService.render()
  }

  async renderCurrentTasks() {
    try {
        this.loaderService.show()
        if (this.taskContainer) {
            const currentTasks = await this.repository.getCurrentTasks()

            let currentTasksHtml: HTMLDivElement[] = []

            currentTasks.forEach((task) => {
                currentTasksHtml.push(
                    TaskComponent({
                        title: task.title,
                        isDone: task.isDone,
                        deleteTask: () => this.deleteTask(task.id),
                        updateTask: (newTitle: string) => this.updateTask(task.id, newTitle),
                        updateStatus: (newStatus: boolean)=> this.updateStatus(task.id, newStatus),
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
    finally {
        this.loaderService.hide()
    }
  }

  async renderDoneTasks() {
    try {
        this.loaderService.show()
        if (this.doneTasksContainer) {
            const doneTasks = await this.repository.getDoneTasks()

            let doneTasksHtml: HTMLDivElement[] = []

            doneTasks.forEach((task) => {
                doneTasksHtml.push(
                    TaskComponent({
                        title: task.title,
                        isDone: task.isDone,
                        deleteTask: () => this.deleteTask(task.id),
                        updateTask: (newTitle: string) => this.updateTask(task.id, newTitle),
                        updateStatus: (newStatus: boolean)=> this.updateStatus(task.id, newStatus),
                    }))
            })

            this.doneTasksContainer.innerHTML = ''
            if (doneTasksHtml.length > 0) {
                this.doneTasksContainer.append(...doneTasksHtml)
            }
            else {
                this.doneTasksContainer.innerHTML = '<div>Нет задач</div>'
            }
        }
    }
    finally {
        this.loaderService.hide()
    }
  }

  createAddTaskEvent() {
    try {
        this.loaderService.show()
        if (this.taskAddBtn) {
            this.taskAddBtn.addEventListener('click', async () => {
                const newTaskTitle = this.taskInput?.value?.trim()

                if(newTaskTitle) {
                    await this.repository.add(newTaskTitle)
                    await this.renderCurrentTasks()
                }
            })
        }
    }
    finally {
        this.loaderService.hide()
    }
  }

  async deleteTask(id: string) {
      try {
          this.loaderService.show()
          await this.repository.remove(id)
          await this.renderDoneTasks()
          await this.renderCurrentTasks()
      }
      finally {
          this.loaderService.hide()
      }
  }

  async updateTask(id: string, newTitle: string) {
      try {
          this.loaderService.show()
          await this.repository.updateTitle(id, newTitle)
          await this.renderDoneTasks()
          await this.renderCurrentTasks()
      }
      finally {
          this.loaderService.hide()
      }
  }

  async updateStatus(id: string, newStatus: boolean) {
      try {
          this.loaderService.show()
          await this.repository.updateStatus(id, newStatus)
          await this.renderCurrentTasks()
          await this.renderDoneTasks()
      }
      finally {
          this.loaderService.hide()
      }
  }
}
