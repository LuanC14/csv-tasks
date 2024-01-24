import { Database } from '../database/database.js'
import { randomUUID } from 'node:crypto'

export class TaskService {

    #database = new Database()

    getTask(id) {
        return this.#database.select('tasks', id ? id : null)
    }

    getAllTasks() {
        return this.#database.select('tasks', null)
    }

    createTasks(title, description) {

        const currentTime = new Date().toLocaleString()

        const task = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: currentTime,
            updated_at: currentTime
        }

        const tasks = this.getAllTasks()

        const verifyTaskWithSameName = tasks.some(task => task.title === title)

        if (verifyTaskWithSameName) {
            return { status: 400 }
        }

        this.#database.insert('tasks', task)

        return { status: 201 }
    }

    updateData(title, description, id) {

        const tasks = this.getAllTasks()

        const verifyTaskWithSameName = tasks.some(task => task.title === title)

        
        if (verifyTaskWithSameName) {
            return { status: 400 }
        }

        const originalTaskData = this.#database.select('tasks', id)

        this.#database.update('tasks', id, {
            title: title ?? originalTaskData.title,
            description: description ?? originalTaskData.title,
            completed_at: originalTaskData.completed_at,
            createad_at: originalTaskData.created_at,
            updated_at: new Date().toLocaleString()
        })

        return {status: 204}
    }

    deleteTask(id) {
        this.#database.delete('tasks', id)
    }
}