import { PaginationResult, SortOrder } from '../types/index'

export const paginate = async <T>(
  repository: any,
  page: number = 1,
  limit: number = 10,
  relations: string[] = [],
  categoryId?: number,
  rating?: number,
  sort?: SortOrder
): Promise<PaginationResult<T>> => {
  // findAndCount to fetch paginated data with total count
  const queryBuilder = repository.createQueryBuilder('entity')

  // Apply relations (left join to fetch related data)
  relations.forEach((relation) => {
    queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation)
  })

  if (categoryId)
    queryBuilder.where('entity.categoryId = :categoryId', { categoryId })

  if (rating) queryBuilder.andWhere('entity.rating <= :rating', { rating })

  if (sort) queryBuilder.orderBy('entity.title', sort)
  // queryBuilder.andWhere('entity.isDeleted = :isDeleted', { isDeleted: false })

  // Clone the query to calculate the correct total count
  const total = await queryBuilder.clone().getCount()

  // Apply pagination
  const data = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  return {
    data,
    total,
    page,
    limit
  }
}
