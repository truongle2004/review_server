import { inject, injectable } from 'tsyringe'
import type { NextFunction, Request, Response } from 'express'
import type { IGetTodoService } from '../services/get-todo.service.interface'

@injectable()
export class TodoController {
  constructor(
    @inject('IGetTodoService') private getTodoService: IGetTodoService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getTodo = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body

    if (id !== 1) {
      res.status(400).send('id must be 1')
      return
    }

    const todo = this.getTodoService.execute()

    res.send(todo)
  }
}
