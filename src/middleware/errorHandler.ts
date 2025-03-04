import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorCode = err.status && StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message && 'Something went wrong'
  res.status(errorCode).json({
    'message': message
  })
}

export default errorHandle
