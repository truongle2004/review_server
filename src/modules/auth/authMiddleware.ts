import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from '../../entities/users.entity'
import { log } from 'console'

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload
  }
}
// Định nghĩa kiểu dữ liệu cho Token payload
interface JwtPayload {
  userId: string
  username: string
  email: string
  roles: Role.ADMIN | Role.USER
}

// Middleware xác thực token
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token || token == '') {
      res
        .status(401)
        .json({ status: 401, message: 'Không có token, từ chối truy cập!' })
      return
    }

    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload
    req.user = decoded
    log(req.user)
    next()
    return
  } catch (err) {
    console.log(err)
    res.status(401).json({ status: 401, message: 'Token không hợp lệ!' })
    return
  }
}

// Middleware cho phép USER và ADMIN truy cập
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: 401, message: 'Chưa xác thực token, từ chối truy cập' })
    return
  }

  if (req.user.roles === Role.USER || req.user.roles === Role.ADMIN) {
    next()
    return
  }

  res.status(403).json({ status: 401, message: 'Bạn không có quyền truy cập' })
  return
}

// Middleware chỉ cho phép ADMIN truy cập
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res
      .status(403)
      .json({ status: 403, message: 'Bạn không có quyền truy cập' })
    return
  }

  if (req.user.roles !== Role.ADMIN) {
    res
      .status(403)
      .json({ status: 403, message: 'Bạn không có quyền truy cập' })
    return
  }

  next()
  return
}
