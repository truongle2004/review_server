import type { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IGetProductService } from '../services/getAllProduct.interface.service'
import type { IGetProductByIdService } from '../services/getProductById.service.interface'
import { IGetProductPaginationService } from '../services/getProductPagination.service.interface'
import type { IDeleteProductService } from '../services/deleteProduct.service.interface'
import type { ICreateProductService } from '../services/createProduct.service.interface'

@injectable()
export class ProductController {
  constructor(
    @inject('IGetProductService')
    private readonly getProductService: IGetProductService,
    @inject('IGetProductByIdService')
    private readonly getProductByIdService: IGetProductByIdService,
    @inject('IGetProductPaginationService')
    private readonly getProductByCategoryService: IGetProductPaginationService,
    @inject('IDeleteProductService')
    private readonly deleteProductService: IDeleteProductService,
    @inject('ICreateProductService')
    private readonly createProductService: ICreateProductService
  ) {}

  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return await this.createProductService.execute(req, res, next)
  }

  public getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.getProductService.execute(req, res, next)
  }

  public getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.getProductByIdService.execute(req, res, next)
  }

  public getProductPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.getProductByCategoryService.execute(req, res, next)
  }

  public deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.deleteProductService.execute(req, res, next)
  }
}
