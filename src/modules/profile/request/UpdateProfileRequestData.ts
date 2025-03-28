import UpdateProfileInputDTO from '../dtos/UpdateProfileDTO'

export class UpdateProfileRequestData {
  data: UpdateProfileInputDTO
  constructor(data: UpdateProfileInputDTO) {
    this.data = data
  }

}
