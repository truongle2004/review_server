import { Request, Response, type NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import { ProductBuilder } from '../../../../entities/builder/products.builder'
import { AppConstant } from '../../../../utils/constant'
import { IGetProductPaginationRepository } from '../../repositories/getProductPagination.repository.interface'
import { IGetProductPaginationService } from '../getProductPagination.service.interface'

@injectable()
export class GetProductPaginationService
  implements IGetProductPaginationService
{
  constructor(
    @inject('IGetProductPaginationRepository')
    private readonly getProductPaginationRepository: IGetProductPaginationRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const pageRequest = Number(req.query.page) || 1
      const limitRequest = Number(req.query.limit) || 10
      const categoryId = Number(req.params.id) || null
      const rating = Number(req.query.rating) || null

      console.log(pageRequest, limitRequest, categoryId)

      const { data, page, limit, total } =
        await this.getProductPaginationRepository.execute(
          pageRequest,
          limitRequest,
          categoryId,
          rating
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
