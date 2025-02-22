import { StatusCodes } from 'http-status-codes'

export class InternalServerException extends Error {
  public status: number
  constructor(message: string = 'Something went wrong') {
    super(message)
    this.status = StatusCodes.INTERNAL_SERVER_ERROR
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
