import type { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import type { IAddCategoryService } from '../services/addCategory.service.interface'
import type { IGetAllCategoriesService } from '../services/getAllCategories.service.interface'

@injectable()
export class CategoryController {
  constructor(
    @inject('IGetAllCategoriesService')
    private readonly getAllCategoriesService: IGetAllCategoriesService,
    @inject('IAddCategoryService')
    private readonly addCategoryService: IAddCategoryService
  ) {}

  public addCategory = async (req: Request, res: Response) => {
    return await this.addCategoryService.execute(req, res)
  }

  public getAllCategories = async (req: Request, res: Response) => {
    return await this.getAllCategoriesService.execute(res)
  }
}
