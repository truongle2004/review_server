import { LoginOutputDTO } from '../dtos/LoginDTO'
import { LoginResponseData } from '../response/LoginResponseData'
import { LoginRequestData } from '../request/LoginRequestData'
import { ILoginPresenter } from '../presenters/ILoginPresenter'
import { ILoginDatase } from '../databases/ILoginDatabase'
import { comparePassword } from '../../../utils/utils'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ILoginService } from './ILoginService'
import dotenv from 'dotenv'
import { RefreshTokenRequestData } from '../request/RefreshTokenRequestData'
import { RefreshTokenOutputDTO } from '../dtos/RefreshTokenDTO'
import { RefreshTokenResponseData } from '../response/RefreshTokenResponseData'
dotenv.config()
import {env} from '../../../config/enviroment'
export class LoginService implements ILoginService {
  presenter: ILoginPresenter
  database: ILoginDatase
  constructor(presenter: ILoginPresenter, database: ILoginDatase) {
    this.presenter = presenter
    this.database = database
  }
  execute = async (data: LoginRequestData) => {
    const { email, password } = data.data
    const isValidEmail: boolean = this.isValidEmail(email)
    const isValidPassword: boolean = this.isValidPassword(password)

    // kiểm tra email
    if (!isValidEmail) {
      const dto = new LoginOutputDTO('', '')
      const responseData = new LoginResponseData(400, 'Invalid email', dto)
      await this.presenter.login(responseData)
      return
    }
    if (!isValidPassword) {
      const dto = new LoginOutputDTO('', '')
      const responseData = new LoginResponseData(
        400,
        'Password must be at least 8 characters',
        dto
      )
      await this.presenter.login(responseData)
      return
    }

    try {
      const result = await this.database.findAccountByEmail(email)
      if (!(await comparePassword(password, result.password))) {
        const dto = new LoginOutputDTO('', '')
        const responseData = new LoginResponseData(
          400,
          'Password is incorrect',
          dto
        )
        await this.presenter.login(responseData)
        return
      } else {
        const payload = {
          userId: result.id,
          username: result.username,
          email: result.email,
          roles: result.roles
        }
        const accessToken = await jwt.sign(
          payload,
          env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: '30m'
          }
        )
        const refreshToken = await jwt.sign(
          payload,
          env.REFRESH_TOKEN_SECRET as string,
          {
            expiresIn: '1d'
          }
        )
        const dto = new LoginOutputDTO(accessToken, refreshToken)
        const responseData = new LoginResponseData(
          200,
          'Login successfully',
          dto
        )
        await this.presenter.login(responseData)
        return
      }
    } catch (error) {
      const dto = new LoginOutputDTO('', '')
      const responseData = new LoginResponseData(
        404,
        (error as Error).message,
        dto
      )
      await this.presenter.login(responseData)
      return
    }
  }

  async doRefreshToken(data: RefreshTokenRequestData): Promise<void> {
    const { refreshToken } = data.data
    if (
      !refreshToken ||
      refreshToken === '' ||
      refreshToken === null ||
      refreshToken === undefined
    ) {
      const dto = new RefreshTokenOutputDTO('')
      const responseData = new RefreshTokenResponseData(
        400,
        'Refresh token is required',
        dto
      )
      await this.presenter.doRefreshToken(responseData)
      return
    }

    let payload
    try {
      payload = await jwt.verify(
        refreshToken,
        env.REFRESH_TOKEN_SECRET as string
      )
    } catch (error) {
      const dto = new RefreshTokenOutputDTO('')
      const responseData = new RefreshTokenResponseData(
        400,
        (error as Error).message,
        dto
      )
      await this.presenter.doRefreshToken(responseData)
      return
    }

    try {
      const user = await this.database.findAccountByEmail(
        (payload as JwtPayload).email
      )

      if (!user) {
        const dto = new RefreshTokenOutputDTO('')
        const responseData = new RefreshTokenResponseData(
          404,
          'User not found',
          dto
        )
        await this.presenter.doRefreshToken(responseData)
        return
      }
    } catch (error) {
      const dto = new RefreshTokenOutputDTO('')
      const responseData = new RefreshTokenResponseData(
        404,
        (error as Error).message,
        dto
      )
      await this.presenter.doRefreshToken(responseData)
      return
    }

    const newPayload = {
      userId: (payload as JwtPayload).userId,
      username: (payload as JwtPayload).username,
      email: (payload as JwtPayload).email,
      roles: (payload as JwtPayload).roles
    }

    const accessToken = await jwt.sign(
      newPayload,
      env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30m' }
    )

    const dto = new RefreshTokenOutputDTO(accessToken)

    const responseData = new RefreshTokenResponseData(
      200,
      'Created New Access Token',
      dto
    )
    await this.presenter.doRefreshToken(responseData)
    return
  }

  isValidEmail(email: string): boolean {
    console.log(email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    return emailRegex.test(email)
  }

  isValidPassword(password: string): boolean {
    console.log(password)
    return password?.length >= 8
  }
}
