import { container } from 'tsyringe'
import { ReviewController } from './controllers/review.controller'
import { ISaveReviewService } from './services/saveReview.interface.service'
import { SaveReviewService } from './services/impl/saveReview.service'
import { ISaveReviewRepository } from './repositories/saveReview.interface.repository'
import { SaveReviewRepository } from './repositories/impl/saveReview.repository'

container.register<ISaveReviewService>('ISaveReviewService', {
  useClass: SaveReviewService
})

container.register<ISaveReviewRepository>('ISaveReviewRepository', {
  useClass: SaveReviewRepository
})
