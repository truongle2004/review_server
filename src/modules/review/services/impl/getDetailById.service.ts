import { Request, Response, NextFunction } from 'express'
import type { IGetDetailByIdService } from '../getDetailById.interface.service'
import { inject, injectable } from 'tsyringe'
import type { IGetDetailByIdRepository } from '../../repositories/getDetailById.interface.repository'
import { NotFoundException } from '../../../../shared/NotFound.exeception'
import { StatusCodes } from 'http-status-codes'
import { BadRequestException } from '../../../../shared/BadRequest.exeception'

@injectable()
export class GetDetailByIdService implements IGetDetailByIdService {
  constructor(
    @inject('IGetDetailByIdRepository')
    private readonly getDetailByIdRepository: IGetDetailByIdRepository
  ) {}
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id

      const review = await this.getDetailByIdRepository.execute(id)

      if (!review) {
        next(new NotFoundException('Review not found'))
      }

      // review.imageUrls = review.images.map(
      //   (imagePath) =>
      //     `${req.protocol}://${req.get('host')}/uploads_review_images/${path.basename(imagePath)}`
      // )

      res.status(StatusCodes.OK).json(review)
    } catch (error) {
      next(new BadRequestException('Bad request'))
    }
  }
}
