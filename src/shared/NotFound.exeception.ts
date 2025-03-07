import { StatusCodes } from "http-status-codes"

export class NotFoundException extends Error {
  public status: number
  constructor(message: string) {
    super(message)
    this.status = StatusCodes.NOT_FOUND
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
