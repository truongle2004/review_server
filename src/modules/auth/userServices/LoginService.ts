import { LoginOutputDTO } from '../dtos/LoginDTO'
import { LoginResponseData } from '../response/LoginResponseData'
import { LoginRequestData } from '../request/LoginRequestData'
import { ILoginPresenter } from '../presenters/ILoginPresenter'
import { ILoginDatase } from '../databases/ILoginDatabase'
import { comparePassword } from '../../../utils/utils'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../../config/jwtConfig'
import { ILoginService } from './ILoginService'
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
      const dto = new LoginOutputDTO('')
      const responseData = new LoginResponseData(400, 'Invalid email', dto)
      await this.presenter.execute(responseData)
      return
    }
    if (!isValidPassword) {
      const dto = new LoginOutputDTO('')
      const responseData = new LoginResponseData(
        400,
        'Password must be at least 8 characters',
        dto
      )
      await this.presenter.execute(responseData)
      return
    }

    try {
      const result = await this.database.findAccountByEmail(email)
      if (!result) {
        const dto = new LoginOutputDTO('')
        dto.jwtCode = ''
        const responseData = new LoginResponseData(404, 'User not found', dto)
        await this.presenter.execute(responseData)
        return
      } else {
        if (!(await comparePassword(password, result.password))) {
          const dto = new LoginOutputDTO('')
          const responseData = new LoginResponseData(
            400,
            'Password is incorrect',
            dto
          )
          await this.presenter.execute(responseData)
          return
        } else {
          const payload = {
            userId: result.userId,
            username: result.username,
            email: result.email,
            roles: result.roles
          }
          const jwtCode = await jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn
          })
          const dto = new LoginOutputDTO(jwtCode)
          const responseData = new LoginResponseData(
            200,
            'Login successfully',
            dto
          )
          await this.presenter.execute(responseData)
          return
        }
      }
    } catch (error) {
      const dto = new LoginOutputDTO('')
      const responseData = new LoginResponseData(400, error.message, dto)
      await this.presenter.execute(responseData)
      return
    }
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
