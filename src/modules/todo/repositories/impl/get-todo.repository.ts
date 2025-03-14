import { injectable } from 'tsyringe'
import type { IGetTodoRepository } from '../get-todo.repository.interface'
import { AppDataSource } from '../../../../config/data-source'
import logger from '../../../../config/logger'
import { Todo } from '../../../../entities/todo.entity'
@injectable()
export class GetTodoRepository implements IGetTodoRepository {
  async execute(): Promise<string> {
    // NOTE: get the repository from datasource
    const todoRepo = AppDataSource.getRepository(Todo)

    let res: Todo | null

    try {
      res = await todoRepo.findOneBy({
        id: 1
      })

      if (!res) logger.info('not found')
    } catch (err) {
      logger.error(err)
    }

    return 'get_to_do'
  }
}
