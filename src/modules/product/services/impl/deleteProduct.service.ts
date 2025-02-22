import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import { NotFoundException } from '../../exception/notFound.exeception'
import type { IDeleteProductRepository } from '../../repositories/deleteProduct.repository.interface'
import type { IDeleteProductService } from '../deleteProduct.service.interface'

@injectable()
export class DeleteProductService implements IDeleteProductService {
  constructor(
    @inject('IDeleteProductRepository')
    private readonly deleteProductRepository: IDeleteProductRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const productId = Number(req.params.id)
      const deleted = await this.deleteProductRepository.execute(productId)

      if (deleted === 0) {
        throw new NotFoundException('Product not found')
      }

      res.status(StatusCodes.NO_CONTENT).json({
        message: 'Product deleted'
      })
    } catch (err) {
      next(err)
    }
  }
}
