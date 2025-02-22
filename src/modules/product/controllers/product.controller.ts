import type { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IGetProductService } from '../services/getAllProduct.interface.service'
import type { IGetProductByIdService } from '../services/getProductById.service.interface'
import { IGetProductByCategoryService } from '../services/getProductByCategory.service.interface'

@injectable()
export class ProductController {
  constructor(
    @inject('IGetProductService')
    private readonly getProductService: IGetProductService,
    @inject('IGetProductByIdService')
    private readonly getProductByIdService: IGetProductByIdService,
    @inject('IGetProductByCategoryService')
    private readonly getProductByCategoryService: IGetProductByCategoryService
  ) {}

  public getProducts = async (req: Request, res: Response) => {
    return await this.getProductService.execute(req, res)
  }

  public getProductById = async (req: Request, res: Response) => {
    return await this.getProductByIdService.execute(req, res)
  }

  public getProductByCategory = async (req: Request, res: Response) => {
    return await this.getProductByCategoryService.execute(req, res)
  }
}
