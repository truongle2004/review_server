export class DataBaseExeception extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
