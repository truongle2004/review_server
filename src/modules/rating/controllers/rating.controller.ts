import { inject, injectable } from 'tsyringe'
import { ISaveRatingServide } from '../services/saveRating.service.interface'
import { NextFunction, Request, Response } from 'express'

@injectable()
export class RatingController {
  constructor(
    @inject('ISaveRatingService')
    private readonly saveRatingService: ISaveRatingServide
  ) {}

  public saveRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.saveRatingService.execute(req, res, next)
  }
}
