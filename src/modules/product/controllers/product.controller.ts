import type { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IGetProductService } from '../services/get-product.interface.service'

@injectable()
export class ProductController {
  constructor(
    @inject('IGetProductService')
    private getProductService: IGetProductService
  ) {}

  /**
   * Get pagination products
   * @param req {Request}
   * @param res {Response}
   * */
  public getProducts = async (req: Request, res: Response) => {
    return await this.getProductService.execute(req, res)
  }
}
