import { RegisterOutputDTO } from '../dtos/RegisterDTO'

export class RegisterResponseData {
  status: number
  message: string
  data: RegisterOutputDTO
  constructor(status: number, message: string, data: RegisterOutputDTO) {
    this.status = status
    this.message = message
    this.data = data
  }
}
