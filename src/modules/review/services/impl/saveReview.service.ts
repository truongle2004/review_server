import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { ReviewsBuilder } from '../../../../entities/builder/reviews.builder'
import type { Products } from '../../../../entities/products.entity'
import { Users } from '../../../../entities/users.entity'
import { BadRequestException } from '../../../../shared/BadRequest.exeception'
import { NotFoundException } from '../../../../shared/NotFound.exeception'
import { InternalServerException } from '../../../product/exception/internalServer.exception'
import type { IGetProductByIdRepository } from '../../../product/repositories/getProductById.repository.interface'
import type { ISaveReviewRepository } from '../../repositories/saveReview.interface.repository'
import type { ISaveReviewService } from '../saveReview.interface.service'
import { ReviewResponseDto } from '../../dto/response/review'

@injectable()
export class SaveReviewService implements ISaveReviewService {
  constructor(
    @inject('IGetProductByIdRepository')
    private readonly getProductByIdRepository: IGetProductByIdRepository,
    @inject('ISaveReviewRepository')
    private readonly saveReviewRepository: ISaveReviewRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.body.userId
      const title = req.body.title
      const productId = Number(req.body.productId)
      const content = req.body.content
      const product = await this.getProductByIdRepository.execute(productId)
      if (!product) {
        next(new NotFoundException('Product not found'))
      }

      const appSoure = AppDataSource.getRepository(Users)

      const user = await appSoure.findOne({
        where: {
          id: userId
        }
      })

      const review = new ReviewsBuilder()
        .setContent(content)
        .setTitle(title)
        .setProduct(product as Products)
        .setUser(user as Users)
        .build()

      const savedReview = await this.saveReviewRepository.execute(review)

      if (!savedReview) {
        next(new BadRequestException('Review not saved. Try again later'))
      }

      const response = new ReviewResponseDto(
        savedReview.id,
        savedReview.title,
        savedReview.content,
        savedReview.rating || 0,
        {
          id: user?.id as string,
          username: user?.username as string
        },
        {
          id: product?.id as number,
          title: product?.title as string
        }
      )

      res.status(StatusCodes.CREATED).json(response)
    } catch (err) {
      next(new InternalServerException())
    }
  }
}
