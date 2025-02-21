import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'
import logger from '../../../../config/logger'
import { InternalServerException } from '../../exception/internalServer.exception'
import { IGetAllCategoriesRepository } from '../../repositories/getAllCategories.repository.interface'
import { IGetAllCategoriesService } from '../getAllCategories.service.interface'

@injectable()
export class GetAllCategoriesService implements IGetAllCategoriesService {
  constructor(
    @inject('IGetAllCategoriesRepository')
    private readonly getAllCategoriesRepository: IGetAllCategoriesRepository
  ) {}
  public execute = async (res: Response): Promise<void> => {
    try {
      const categories = await this.getAllCategoriesRepository.execute()

      res.status(StatusCodes.OK).json(categories)
    } catch (err) {
      logger.error(err)
      throw new InternalServerException()
    }
  }
}
