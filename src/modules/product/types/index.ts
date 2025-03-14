export interface PaginationResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

