import 'reflect-metadata'
import { container } from 'tsyringe'
import { RatingController } from '../../modules/rating/controllers/rating.controller'
import { Router } from 'express'

const ratingController = container.resolve(RatingController)

const router = Router()

router.route('/').post(ratingController.saveRating)

export const ratingRoute = router
