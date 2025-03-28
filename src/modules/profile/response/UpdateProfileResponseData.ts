import { UpdateProfileOutputDTO } from "../dtos/UpdateProfileDTO"

export class UpdateProfileResponseData {
  status: number
  message: string
  data: UpdateProfileOutputDTO
  constructor(status: number, message: string, data: UpdateProfileOutputDTO) {
    this.data = data
    this.message = message
    this.status = status
  }
}
