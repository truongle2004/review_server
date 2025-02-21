import { PaginationResult } from '../types/index'

export const paginate = async <T>(
  repository: any,
  page: number = 1,
  limit: number = 10,
  relations: string[] = []
): Promise<PaginationResult<T>> => {
  // findAndCount to fetch paginated data with total count
  const queryBuilder = repository.createQueryBuilder('entity')

  // Apply relations (left join to fetch related data)
  relations.forEach((relation) => {
    queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation)
  })

  // Get total count before applying pagination
  const total = await queryBuilder.getCount()

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
