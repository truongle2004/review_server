import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import logger from '../../../../config/logger'
import { ProductBuilder } from '../../../../entities/builder/products.builder'
import { AppConstant } from '../../../../utils/constant'
import { InternalServerException } from '../../exception/internalServer.exception'
import { IGetProductByCategoryRepository } from '../../repositories/getProductByCategory.repository.interface'
import { IGetProductByCategoryService } from '../getProductByCategory.service.interface'

@injectable()
export class GetProductByCategoryService
  implements IGetProductByCategoryService
{
  constructor(
    @inject('IGetProductByCategoryRepository')
    private readonly getProductByCategoryRepository: IGetProductByCategoryRepository
  ) {}
  public execute = async (req: Request, res: Response): Promise<void> => {
    console.log('is called')

    const categoryId = Number(req.params.id)
    try {
      const pageRequest = Number(req.query.page) || 1
      const limitRequest = Number(req.query.limit) || 10

      const { data, page, limit, total } =
        await this.getProductByCategoryRepository.execute(
          categoryId,
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
      logger.error('Error fetching products:', err)
      throw new InternalServerException()
    }
  }
}
