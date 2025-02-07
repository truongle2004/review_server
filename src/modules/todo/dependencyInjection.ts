import 'reflect-metadata'
import { container } from 'tsyringe'
import { IGetTodoRepository } from './repositories/get-todo.repository.interface'
import { GetTodoRepository } from './repositories/impl/get-todo.repository'
import { TodoController } from './controllers/todo.controller'
import type { IGetTodoService } from './services/get-todo.service.interface'
import { GetTodoService } from './services/impl/get-todo.service'

// NOTE: register dependency injection
container.register<IGetTodoRepository>('IGetTodoRepository', {
  useClass: GetTodoRepository
})

container.register<IGetTodoService>('IGetTodoService', {
  useClass: GetTodoService
})

// NOTE: the tsyringe handles recursive resolution, we only need to resolve the top-level dependency (TodoController). All the dependencies will automatically resolved and injected
container.resolve(TodoController)
