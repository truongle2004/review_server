import { injectable } from 'tsyringe'
import { IGetTodoRepository } from '../get-todo.repository.interface'
import { AppDataSource } from '../../../../config/data-source'
import { Todo } from '../../../../entities/todo.entity'
import logger from '../../../../config/logger'

@injectable()
export class GetTodoRepository implements IGetTodoRepository {
  async execute(): Promise<string> {
    // NOTE: get the repository from datasource
    const todoRepo = AppDataSource.getRepository(Todo)

    let res: Todo | null

    try {
      res = await todoRepo.findOneBy({
        id: 2
      })

      if (!res) logger.info('not found')
    } catch (err) {
      logger.error(err)
    }

    return 'get_to_do'
  }
}
