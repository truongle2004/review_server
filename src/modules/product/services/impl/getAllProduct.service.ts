import type { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { ProductBuilder } from '../../../../entities/builder/products.builder'
import { AppConstant } from '../../../../utils/constant'
import type { IProductRepository } from '../../repositories/getAllProduct.repository.interface'
import type { IGetProductService } from '../getAllProduct.interface.service'
import { StatusCodes } from 'http-status-codes'
import logger from '../../../../config/logger'
import { InternalServerException } from '../../exception/internalServer.exception'

@injectable()
export class GetProductService implements IGetProductService {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const pageRequest = Number(req.query.page) || 1
      const limitRequest = Number(req.query.limit) || 10

      const { data, page, limit, total } = await this.productRepository.execute(
        pageRequest,
        limitRequest
      )

      const response_data = data.map((product) => {
        const first_images = product.images.filter(
          (image) => image.position === AppConstant.IMAGE_FIRST_POSITION
        )

        // TODO: avoid duplicate images
        return new ProductBuilder()
          .setId(product.id)
          .setTitle(product.title)
          .setCategory(product.category)
          .setRating(product.rating)
          .setImages(first_images)
          .build()
      })

      res.status(StatusCodes.OK).json({
        data: response_data,
        page,
        limit,
        total
      })
    } catch (err) {
      next(err)
    }
  }
}
