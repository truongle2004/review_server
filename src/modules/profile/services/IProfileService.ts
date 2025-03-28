import { UpdateProfileRequestData } from '../request/UpdateProfileRequestData'

export interface IProfileService {
  update(data: UpdateProfileRequestData): Promise<void>
}
