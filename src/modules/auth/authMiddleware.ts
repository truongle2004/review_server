import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../../entities/users.entity";

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload;
    }
}
// Định nghĩa kiểu dữ liệu cho Token payload
interface JwtPayload {
    username:string;
    email: string;
    roles: "USER" | "ADMIN";
}

// Middleware xác thực token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Không có token, từ chối truy cập!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // Gán thông tin user vào request để middleware sau có thể sử dụng

    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

// Middleware cho phép USER và ADMIN truy cập
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
  }

  if (req.user.roles === "USER" || req.user.roles === "ADMIN") {
    return next();
  }

  return res.status(403).json({ message: "Bạn không có quyền truy cập USER!" });
};


// Middleware chỉ cho phép ADMIN truy cập
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.roles !== Role.ADMIN) {
    return res.status(403).json({ message: "Bạn không có quyền truy cập ADMIN!" });
  }
  next();
};