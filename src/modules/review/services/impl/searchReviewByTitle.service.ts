import { NextFunction, Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { Reviews } from '../../../../entities/reviews.entity'
import { ISearchReviewByTitleService } from '../searchReviewByTitle.service.interface'
import { StatusCodes } from 'http-status-codes'
import { BadRequestException } from '../../../../shared/BadRequest.exeception'

@injectable()
export class SearchReviewByTitleService implements ISearchReviewByTitleService {
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title } = req.query

      if (!title || typeof title !== 'string') {
        next(new BadRequestException('Title query parameter is required'))
        return
      }

      const reviewSource = AppDataSource.getRepository(Reviews)

      const reviews = await reviewSource
        .createQueryBuilder('review')
        .select(['review.id', 'review.title'])
        .where('LOWER(review.title) LIKE LOWER(:title)', {
          title: `%${title}%`
        })
        .getMany()

      res.status(StatusCodes.OK).json({
        message: 'Reviews found successfully',
        data: reviews
      })
    } catch (error) {
      console.error('Error searching reviews:', error)
      next(error)
    }
  }
}
