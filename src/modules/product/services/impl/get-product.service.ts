import type { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IProductRepository } from '../../repositories/product.repository.interface'
import type { IGetProductService } from '../get-product.interface.service'

@injectable()
export class GetProductService implements IGetProductService {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}
  public async execute(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10

      // TODO: validate page and limit

      // Ensure `page` and `limit` are positive integers
      if (page < 1 || limit < 1) {
        res
          .status(400)
          .json({ error: 'Page and limit must be positive numbers' })
        return
      }

      const data = await this.productRepository.getProducts(page, limit)

      res.status(200).json(data)
    } catch (err) {
      console.error('Error fetching products:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
