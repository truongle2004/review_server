import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { IGetAllReviewsRepository } from '../../repositories/getAllReviews.interface.repository'
import { IGetAllReviewsService } from '../getAllReviews.interface.service'

@injectable()
export class GetAllReviewsService implements IGetAllReviewsService {
  constructor(
    @inject('IGetAllReviewsRepository')
    private readonly getAllReviewsRepository: IGetAllReviewsRepository
  ) {}

  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10

      const { data, total } = await this.getAllReviewsRepository.execute(
        page,
        limit
      )

      res.status(StatusCodes.OK).json({
        message: 'Reviews fetched successfully',
        data,
        pagination: {
          page,
          limit,
          total
        }
      })
    } catch (error) {
      console.error('Error fetching reviews:', error)
      next(error)
    }
  }
}
