import type { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IAddCategoryService } from '../services/addCategory.service.interface'
import type { IGetAllCategoriesService } from '../services/getAllCategories.service.interface'
import { IDeleteCategoryService } from '../services/deleteCategory.service.interface'

@injectable()
export class CategoryController {
  constructor(
    @inject('IGetAllCategoriesService')
    private readonly getAllCategoriesService: IGetAllCategoriesService,
    @inject('IAddCategoryService')
    private readonly addCategoryService: IAddCategoryService,
    @inject('IDeleteCategoryService')
    private readonly deleteCategoryService: IDeleteCategoryService
  ) {}

  public addCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.addCategoryService.execute(req, res, next)
  }

  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.getAllCategoriesService.execute(req, res, next)
  }

  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return await this.deleteCategoryService.execute(req, res, next)
  }
}
