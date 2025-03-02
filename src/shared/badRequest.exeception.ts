import { StatusCodes } from 'http-status-codes'

export class BadRequestException extends Error {
  public status: number
  constructor(message: string) {
    super(message)
    this.status = StatusCodes.BAD_REQUEST
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
