import 'reflect-metadata'
import { container } from 'tsyringe'
import { SaveRatingService } from './services/impl/saveRating.service'
import { ISaveRatingServide } from './services/saveRating.service.interface'
import { RatingController } from './controllers/rating.controller'

container.register<ISaveRatingServide>('ISaveRatingService', {
  useClass: SaveRatingService
})

container.resolve<RatingController>
