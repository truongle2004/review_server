import { StatusCodes } from 'http-status-codes'

export class DuplicateExeception extends Error {
  public status: number
  constructor(message: string) {
    super(message)
    this.name = "DuplicateExeception"
    this.status = StatusCodes.CONFLICT
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
