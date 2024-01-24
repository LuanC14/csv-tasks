import { buildRoutePath } from './utils/build-route-path.js'
import { TaskService } from './services/TaskService.js'
import { CsvStreamService } from './services/CsvStreamService.js'

const service = new TaskService()

export const routes = [

  /*GET DE TASKS*/
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      let { id } = req.query

      if (id) {
        const task = service.getTask(id)
        return res.end(JSON.stringify(task))
      }

      const tasks = service.getAllTasks()

      return res.end(JSON.stringify(tasks))
    }
  },

  /*POST PARA CRIAÇÃO DE TASKS*/
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const result = service.createTasks(title, description)

      if (result.status === 400) {
        return res.writeHead(result.status).end()
      }

      return res.writeHead(result.status).end()
    }
  },

  /*POST PARA IMPORTAÇÃO DE TASKS VIA CSV*/
  {
    method: 'POST',
    path: buildRoutePath('/tasks/import'),
    handler: async (req, res) => {
      new CsvStreamService().execute();
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const result = service.updateData(title, description, id)

      if (result.status === 400) {
        res.writeHead(400).end()
      }

      return res.writeHead(result.status).end()
    }
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

      const { id } = req.params

      service.deleteTask(id)

      return res.writeHead(204).end()
    }
  }

]