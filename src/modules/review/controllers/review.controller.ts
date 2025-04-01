import { inject, injectable } from 'tsyringe'
import { ISaveReviewService } from '../services/saveReview.interface.service'
import { Request, Response, NextFunction } from 'express'
import type { IGetReviewByProductIdService } from '../services/getReviewByProductId.interface.service'
import type { IGetReviewByUserIdService } from '../services/getReviewByUserId.interface.service'
import type { IGetDetailByIdService } from '../services/getDetailById.interface.service'
import type { ISearchReviewByTitleService } from '../services/searchReviewByTitle.service.interface'
import type { IGetAllReviewsService } from '../services/getAllReviews.interface.service'
import { AppDataSource } from '../../../config/data-source'
import { Reviews } from '../../../entities/reviews.entity'
import { StatusCodes } from 'http-status-codes'

@injectable()
export class ReviewController {
  constructor(
    @inject('ISaveReviewService')
    private readonly saveReviewService: ISaveReviewService,
    @inject('IGetReviewByProductIdService')
    private readonly getReviewByProductIdService: IGetReviewByProductIdService,
    @inject('IGetReviewByUserIdService')
    private readonly getReviewByUserIdService: IGetReviewByUserIdService,
    @inject('IGetDetailByIdService')
    private readonly getDetailByIdService: IGetDetailByIdService,
    @inject('ISearchReviewByTitleService')
    private readonly searchReviewByTitleService: ISearchReviewByTitleService,
    @inject('IGetAllReviewsService')
    private readonly getAllReviewsService: IGetAllReviewsService
  ) {}

  public saveReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.saveReviewService.execute(req, res, next)
  }

  public getReviewByProductId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.getReviewByProductIdService.execute(req, res, next)
  }

  public getReviewByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.getReviewByUserIdService.execute(req, res, next)
  }

  public getDetailById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.getDetailByIdService.execute(req, res, next)
  }

  public searchReviewByTitle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.searchReviewByTitleService.execute(req, res, next)
  }

  public deleteReview = async (req: Request, res: Response) => {
    const appSouce = AppDataSource.getRepository(Reviews)
    const { id } = req.params
    await appSouce.delete({ id })
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: 'Review deleted successfully' })
  }

  public updateReview = async (req: Request, res: Response) => {
    const appSouce = AppDataSource.getRepository(Reviews)
    const title = req.body.title
    const content = req.body.content
    const reviewId = req.body.reviewId

    const review = await appSouce.findOne({
      where: {
        id: reviewId
      }
    })
    if (!review) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found' })
      return
    }
    review.title = title
    review.content = content
    await appSouce.save(review)
    res.status(StatusCodes.OK).json({ message: 'Review updated successfully' })
  }

  public getAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.getAllReviewsService.execute(req, res, next)
  }
}
