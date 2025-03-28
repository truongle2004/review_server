import type { Request, Response, NextFunction } from 'express'
import type { IGetReviewByUserIdService } from '../getReviewByUserId.interface.service'
import { inject, injectable } from 'tsyringe'
import type { IGetReviewByUserIdRepository } from '../../repositories/getReviewByUserId.interface'
import { StatusCodes } from 'http-status-codes'

@injectable()
export class GetReviewByUserIdService implements IGetReviewByUserIdService {
  constructor(
    @inject('IGetReviewByUserIdRepository')
    private readonly getReviewByUserIdRepository: IGetReviewByUserIdRepository
  ) {}
  execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id)
      const reviews = await this.getReviewByUserIdRepository.execute(userId)
      res.status(StatusCodes.OK).json(reviews)
    } catch (error) {
      next(error)
    }
  }
}
