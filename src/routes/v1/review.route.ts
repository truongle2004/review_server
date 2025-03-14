import { container } from 'tsyringe'
import { ReviewController } from '../../modules/review/controllers/review.controller'
import { Router } from 'express'

const router = Router()

const reviewController = container.resolve(ReviewController)

router.route('/').post(reviewController.saveReview)

export const reviewRoute = router
