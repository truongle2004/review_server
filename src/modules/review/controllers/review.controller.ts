import { inject, injectable } from 'tsyringe'
import { ISaveReviewService } from '../services/saveReview.interface.service'
import { Request, Response, NextFunction } from 'express'

@injectable()
export class ReviewController {
  constructor(
    @inject('ISaveReviewService')
    private readonly saveReviewService: ISaveReviewService
  ) {}

  public saveReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.saveReviewService.execute(req, res, next)
  }
}
