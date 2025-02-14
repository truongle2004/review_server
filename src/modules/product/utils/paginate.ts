import { PaginationResult } from '../types/index'

export const paginate = async <T>(
  repository: any,
  page: number = 1,
  limit: number = 10
): Promise<PaginationResult<T>> => {
  // findAndCount to fetch paginated data with total count
  const [data, total] = await repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit
  })

  return {
    data,
    total,
    page,
    limit
  }
}
