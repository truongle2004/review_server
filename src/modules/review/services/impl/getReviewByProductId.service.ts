import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { IGetReviewByProductIdRepository } from '../../repositories/getReviewByProductId.interface.repository'
import type { IGetReviewByProductIdService } from '../getReviewByProductId.interface.service'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetReviewByProductIdService
  implements IGetReviewByProductIdService
{
  constructor(
    @inject('IGetReviewByProductIdRepository')
    private readonly getReviewByProductIdRepository: IGetReviewByProductIdRepository
  ) {}

  execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const productId = Number(req.params.id)
      const reviews =
        await this.getReviewByProductIdRepository.execute(productId)
      res.status(StatusCodes.OK).json(reviews)
    } catch (error) {
      next(error)
    }
  }
}
