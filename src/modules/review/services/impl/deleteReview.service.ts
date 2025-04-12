import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { IDeleteReviewRepository } from '../../repositories/deleteReview.interface.repository'
import { IDeleteReviewService } from '../deleteReview.interface.service'
import { NotFoundException } from '../../../../shared/NotFound.exeception'
import { InternalServerException } from '../../../product/exception/internalServer.exception'

@injectable()
export class DeleteReviewService implements IDeleteReviewService {
  constructor(
    @inject('IDeleteReviewRepository')
    private readonly deleteReviewRepository: IDeleteReviewRepository
  ) {}

  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params

      if (!id) {
        next(new NotFoundException('Review ID is required'))
        return
      }

      const isDeleted = await this.deleteReviewRepository.execute(id)

      if (!isDeleted) {
        next(new NotFoundException('Review not found'))
        return
      }

      res.status(StatusCodes.NO_CONTENT).json({
        message: 'Review and related comments deleted successfully'
      })
    } catch {
      next(new InternalServerException())
    }
  }
}
