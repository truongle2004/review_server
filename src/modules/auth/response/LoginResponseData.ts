import { LoginOutputDTO } from '../dtos/LoginDTO'

export class LoginResponseData {
  status: number
  message: string
  data: LoginOutputDTO

  constructor(status: number, message: string, data: LoginOutputDTO) {
    this.status = status
    this.message = message
    this.data = data
  }
}
