import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import { IDeleteCategoryRepository } from '../../repositories/deleteCategory.repository.interface'
import { IDeleteCategoryService } from '../deleteCategory.service.interface'
import { NotFoundException } from '../../../../shared/NotFound.exeception'

@injectable()
export class DeleteCategoryService implements IDeleteCategoryService {
  constructor(
    @inject('IDeleteCategoryRepository')
    private readonly deleteCategoryRepository: IDeleteCategoryRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id)

      if (isNaN(id)) {
        next(new NotFoundException('Category not found'))
      }

      const result = await this.deleteCategoryRepository.execute(id)

      if (result === 0) {
        next(new NotFoundException('Category not found'))
      }

      res.status(StatusCodes.NO_CONTENT).json({
        message: 'Category deleted',
        id: id
      })
    } catch (err) {
      next(err)
    }
  }
}
