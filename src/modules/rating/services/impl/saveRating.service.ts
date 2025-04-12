import { NextFunction, Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { AppDataSource } from '../../../../config/data-source'
import { RatingEntity } from '../../../../entities/rating.entity'
import { Users } from '../../../../entities/users.entity'
import { ISaveRatingServide } from '../saveRating.service.interface'
import { Reviews } from '../../../../entities/reviews.entity'
import { StatusCodes } from 'http-status-codes'
import { BadRequestException } from '../../../../shared/BadRequest.exeception'
import { NotFoundException } from '../../../../shared/NotFound.exeception'

@injectable()
export class SaveRatingService implements ISaveRatingServide {
  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviewId = req.body.reviewId
      const userId = req.body.userId
      const rating = req.body.rating

      if (!reviewId || !userId || !rating) {
        next(new BadRequestException('Missing required fields'))
        return
      }

      const ratingSource = AppDataSource.getRepository(RatingEntity)
      const userSource = AppDataSource.getRepository(Users)
      const reviewSource = AppDataSource.getRepository(Reviews)

      const user = await userSource.findOne({
        where: {
          id: userId
        }
      })

      if (!user) {
        next(new NotFoundException('User not found'))
        return
      }

      const isRating = await ratingSource.findOne({
        where: {
          user: {
            id: userId
          },
          reviews: { id: reviewId }
        }
      })

      if (isRating) {
        res.status(StatusCodes.CONFLICT).json({
          message: 'You have already rated this review'
        })
        return
      }

      const review = await reviewSource.findOne({
        where: {
          id: reviewId
        }
      })

      if (!review) {
        next(new NotFoundException('Review not found'))
        return
      }

      const ratingEntity = new RatingEntity()
      ratingEntity.rating = rating
      ratingEntity.reviews = review
      ratingEntity.user = user

      try {
        await ratingSource.save(ratingEntity)

        const list_rating = await ratingSource.find({
          where: {
            reviews: {
              id: reviewId
            }
          }
        })

        let sum = 0
        let count = 0

        for (const rating of list_rating) {
          sum += rating.rating
          count++
        }

        const averageRating = count > 0 ? sum / count : 0

        await reviewSource.update(reviewId, {
          rating: averageRating
        })

        res
          .status(StatusCodes.OK)
          .json({ message: 'Rating saved successfully' })
      } catch (saveError: unknown) {
        console.error('Error saving rating:', saveError)
        const errorMessage =
          saveError instanceof Error ? saveError.message : 'Unknown error'
        next(new BadRequestException('Failed to save rating: ' + errorMessage))
      }
    } catch (error) {
      console.error('Error in save rating service:', error)
      next(error)
    }
  }
}
