/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITokenService } from './ITokenService'
import jwt from 'jsonwebtoken'
import { jwtConfig } from './jwtConfig'

export class TokenService implements ITokenService {

  generateToken(payload: any): string {
    console.log(payload)
    const expirationTime =
      Math.floor(Date.now() / 1000) + parseInt(jwtConfig.expiresIn)
    payload.exp = expirationTime
    return jwt.sign(payload, jwtConfig.secret)
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, jwtConfig.secret)
    } catch (e) {
      return null
    }
  }
}
