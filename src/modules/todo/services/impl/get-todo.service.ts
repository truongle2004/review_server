import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import type { IGetTodoRepository } from '../../repositories/get-todo.repository.interface'
import { IGetTodoService } from '../get-todo.service.interface'

@injectable()
export class GetTodoService implements IGetTodoService {
  constructor(
    @inject('IGetTodoRepository')
    private getTodoRepository: IGetTodoRepository
  ) {}

  execute(): string {
    // TODO: retrieve data from db
    this.getTodoRepository.execute()

    return 'get_to_do'
  }
}
