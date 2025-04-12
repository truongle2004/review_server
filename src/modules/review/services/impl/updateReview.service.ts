import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { IUpdateReviewRepository } from '../../repositories/updateReview.interface.repository'
import { IUpdateReviewService } from '../updateReview.interface.service'
import { NotFoundException } from '../../../../shared/NotFound.exeception'
import { BadRequestException } from '../../../../shared/BadRequest.exeception'
import { InternalServerException } from '../../../product/exception/internalServer.exception'

@injectable()
export class UpdateReviewService implements IUpdateReviewService {
  constructor(
    @inject('IUpdateReviewRepository')
    private readonly updateReviewRepository: IUpdateReviewRepository
  ) {}

  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviewId = req.params.id
      const { title, content } = req.body

      if (!reviewId || !title || !content) {
        next(
          new BadRequestException('Review ID, title, and content are required')
        )
        return
      }

      const updatedReview = await this.updateReviewRepository.execute(
        reviewId,
        title,
        content
      )

      if (!updatedReview) {
        next(new NotFoundException('Review not found'))
        return
      }

      res.status(StatusCodes.OK).json({
        message: 'Review updated successfully',
        data: {
          id: updatedReview.id,
          title: updatedReview.title,
          content: updatedReview.content,
          updatedAt: updatedReview.updatedAt
        }
      })
    } catch {
      next(new InternalServerException())
    }
  }
}
