import type { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IGetProductService } from '../services/getAllProduct.interface.service'
import type { IGetProductByIdService } from '../services/getProductById.service.interface'
import { IGetProductByCategoryService } from '../services/getProductByCategory.service.interface'
import type { IDeleteProductService } from '../services/deleteProduct.service.interface'

@injectable()
export class ProductController {
  constructor(
    @inject('IGetProductService')
    private readonly getProductService: IGetProductService,
    @inject('IGetProductByIdService')
    private readonly getProductByIdService: IGetProductByIdService,
    @inject('IGetProductByCategoryService')
    private readonly getProductByCategoryService: IGetProductByCategoryService,
    @inject('IDeleteProductService')
    private readonly deleteProductService: IDeleteProductService
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

  public deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.deleteProductService.execute(req, res, next)
  }
}
