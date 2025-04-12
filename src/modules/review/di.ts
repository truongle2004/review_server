import { container } from 'tsyringe'
import { IGetReviewByProductIdRepository } from './repositories/getReviewByProductId.interface.repository'
import { GetReviewByProductIdRepository } from './repositories/impl/getReviewByProductId.repository'
import { SaveReviewRepository } from './repositories/impl/saveReview.repository'
import { ISaveReviewRepository } from './repositories/saveReview.interface.repository'
import { IGetReviewByProductIdService } from './services/getReviewByProductId.interface.service'
import { GetReviewByProductIdService } from './services/impl/getReviewByProductId.service'
import { SaveReviewService } from './services/impl/saveReview.service'
import { ISaveReviewService } from './services/saveReview.interface.service'
import { IGetReviewByUserIdRepository } from './repositories/getReviewByUserId.interface'
import { GetReviewByUserIdRepository } from './repositories/impl/getReviewByUserId.repository'
import { IGetReviewByUserIdService } from './services/getReviewByUserId.interface.service'
import { GetReviewByUserIdService } from './services/impl/getReviewByUserId.service'
import type { IGetDetailByIdRepository } from './repositories/getDetailById.interface.repository'
import { GetDetailByIdRepository } from './repositories/impl/getDetailById.repository'
import { IGetDetailByIdService } from './services/getDetailById.interface.service'
import { GetDetailByIdService } from './services/impl/getDetailById.service'
import type { ISearchReviewByTitleService } from './services/searchReviewByTitle.service.interface'
import { SearchReviewByTitleService } from './services/impl/searchReviewByTitle.service'
import { IGetAllReviewsRepository } from './repositories/getAllReviews.interface.repository'
import { GetAllReviewsRepository } from './repositories/impl/getAllReviews.repository'
import { IGetAllReviewsService } from './services/getAllReviews.interface.service'
import { GetAllReviewsService } from './services/impl/getAllReviews.service'
import { IDeleteReviewRepository } from './repositories/deleteReview.interface.repository'
import { DeleteReviewRepository } from './repositories/impl/deleteReview.repository'
import { IDeleteReviewService } from './services/deleteReview.interface.service'
import { DeleteReviewService } from './services/impl/deleteReview.service'
import { IUpdateReviewRepository } from './repositories/updateReview.interface.repository'
import { UpdateReviewRepository } from './repositories/impl/updateReview.repository'
import { IUpdateReviewService } from './services/updateReview.interface.service'
import { UpdateReviewService } from './services/impl/updateReview.service'

container.register<ISaveReviewService>('ISaveReviewService', {
  useClass: SaveReviewService
})

container.register<ISaveReviewRepository>('ISaveReviewRepository', {
  useClass: SaveReviewRepository
})

container.register<IGetReviewByProductIdRepository>(
  'IGetReviewByProductIdRepository',
  {
    useClass: GetReviewByProductIdRepository
  }
)

container.register<IGetReviewByProductIdService>(
  'IGetReviewByProductIdService',
  {
    useClass: GetReviewByProductIdService
  }
)

container.register<IGetReviewByUserIdRepository>(
  'IGetReviewByUserIdRepository',
  {
    useClass: GetReviewByUserIdRepository
  }
)

container.register<ISearchReviewByTitleService>('ISearchReviewByTitleService', {
  useClass: SearchReviewByTitleService
})

container.register<IGetReviewByUserIdService>('IGetReviewByUserIdService', {
  useClass: GetReviewByUserIdService
})

container.register<IGetDetailByIdRepository>('IGetDetailByIdRepository', {
  useClass: GetDetailByIdRepository
})

container.register<IGetDetailByIdService>('IGetDetailByIdService', {
  useClass: GetDetailByIdService
})

container.register<IGetAllReviewsRepository>('IGetAllReviewsRepository', {
  useClass: GetAllReviewsRepository
})

container.register<IGetAllReviewsService>('IGetAllReviewsService', {
  useClass: GetAllReviewsService
})

container.register<IDeleteReviewRepository>('IDeleteReviewRepository', {
  useClass: DeleteReviewRepository
})

container.register<IDeleteReviewService>('IDeleteReviewService', {
  useClass: DeleteReviewService
})

container.register<IUpdateReviewRepository>('IUpdateReviewRepository', {
  useClass: UpdateReviewRepository
})

container.register<IUpdateReviewService>('IUpdateReviewService', {
  useClass: UpdateReviewService
})
