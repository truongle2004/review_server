import { inject, injectable } from 'tsyringe'
import { ISaveReviewService } from '../services/saveReview.interface.service'
import { Request, Response, NextFunction } from 'express'
import type { IGetReviewByProductIdService } from '../services/getReviewByProductId.interface.service'
import type { IGetReviewByUserIdService } from '../services/getReviewByUserId.interface.service'
import type { IGetDetailByIdService } from '../services/getDetailById.interface.service'
import type { ISearchReviewByTitleService } from '../services/searchReviewByTitle.service.interface'
import type { IGetAllReviewsService } from '../services/getAllReviews.interface.service'
import type { IDeleteReviewService } from '../services/deleteReview.interface.service'
import type { IUpdateReviewService } from '../services/updateReview.interface.service'

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
    private readonly getAllReviewsService: IGetAllReviewsService,
    @inject('IDeleteReviewService')
    private readonly deleteReviewService: IDeleteReviewService,
    @inject('IUpdateReviewService')
    private readonly updateReviewService: IUpdateReviewService
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

  public deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.deleteReviewService.execute(req, res, next)
  }

  public updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.updateReviewService.execute(req, res, next)
  }

  public getAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.getAllReviewsService.execute(req, res, next)
  }
}
