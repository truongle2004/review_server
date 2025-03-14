import { Request, Response, type NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import { QueryFailedError } from 'typeorm'
import logger from '../../../../config/logger'
import { DuplicateExeception } from '../../exception/duplicate.exception'
import { InternalServerException } from '../../exception/internalServer.exception'
import { IAddCategoryRepository } from '../../repositories/addCategory.repository.interface'
import { IAddCategoryService } from '../addCategory.service.interface'

@injectable()
export class AddCategoryService implements IAddCategoryService {
  constructor(
    @inject('IAddCategoryRepository')
    private readonly addCategoryRepository: IAddCategoryRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const name: string = req.body.name
      const description: string = req.body.description

      const saved = await this.addCategoryRepository.execute(name, description)

      res.status(StatusCodes.CREATED).json(saved)
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes('Duplicate')
      ) {
        return next(new DuplicateExeception('Category already exists'))
      }

      next(new InternalServerException())
    }
  }
}
