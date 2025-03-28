import { Request, Response } from 'express'
import { LoginInputDTO } from '../dtos/LoginDTO'
import { LoginRequestData } from '../request/LoginRequestData'
import { ILoginPresenter } from '../presenters/ILoginPresenter'
import { ILoginService } from '../userServices/ILoginService'
import { log } from 'console'
import { LoginResponseData } from '../response/LoginResponseData'
import { RefreshTokenInputDTO } from '../dtos/RefreshTokenDTO'
import { RefreshTokenResponseData } from '../response/RefreshTokenResponseData'
import { RefreshTokenRequestData } from '../request/RefreshTokenRequestData'
export class LoginController {
  loginService: ILoginService
  presenter: ILoginPresenter

  constructor(loginService: ILoginService, presenter: ILoginPresenter) {
    this.loginService = loginService
    this.presenter = presenter
  }

  execute = async (
    req: Request<object, object, LoginInputDTO, object>,
    res: Response<LoginResponseData>
  ) => {
    const inputData = new LoginInputDTO(req.body.email, req.body.password)
    const loginRequestData = new LoginRequestData(inputData)
    await this.loginService.execute(loginRequestData)
    const viewModel = this.presenter.getLoginViewModel()
    res.cookie('refreshToken', viewModel.data.refreshToken, { httpOnly: true })
    res.status(viewModel.status).send(viewModel)
  }

  doRefreshToken = async (
    req: Request<object, object, RefreshTokenInputDTO, object>,
    res: Response<RefreshTokenResponseData>
  ) => {
    const inputData = new RefreshTokenInputDTO(req.cookies.refreshToken)
    const refreshTokenRequestData = new RefreshTokenRequestData(inputData)

    await this.loginService.doRefreshToken(refreshTokenRequestData)

    const viewModel = this.presenter.getRefreshTokenViewModel()
    res.status(viewModel.status).send(viewModel)
  }
}
