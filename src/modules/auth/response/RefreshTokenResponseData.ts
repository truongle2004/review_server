import { RefreshTokenOutputDTO } from "../dtos/RefreshTokenDTO"

export class RefreshTokenResponseData {
  status: number
  message: string
  data: RefreshTokenOutputDTO
  constructor(status: number, message: string, data:RefreshTokenOutputDTO) {
    this.status = status
    this.message = message
    this.data = data
  }
}
