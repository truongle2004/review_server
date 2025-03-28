import type { Reviews } from '../../../entities/reviews.entity'

export interface IGetDetailByIdRepository {
  execute: (id: string) => Promise<Reviews>
}
