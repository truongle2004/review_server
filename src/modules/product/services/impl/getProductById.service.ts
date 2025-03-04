import { Request, Response, type NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import { NotFoundException } from '../../exception/notFound.exeception'
import { IGetProductByIdRepository } from '../../repositories/getProductById.repository.interface'
import { IGetProductByIdService } from '../getProductById.service.interface'

@injectable()
export class GetProductByIdService implements IGetProductByIdService {
  constructor(
    @inject('IGetProductByIdRepository')
    private readonly getProductByIdRepository: IGetProductByIdRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const productId = Number(req.params.id)

    if (isNaN(productId)) {
      throw new NotFoundException(`Product id: ${productId} not found`)
    }

    try {
      const product = await this.getProductByIdRepository.execute(productId)

      if (!product) {
        throw new NotFoundException('Product not found')
      }

      res.status(StatusCodes.OK).json(product)
    } catch (error) {
      next(error)
    }
  }
}
