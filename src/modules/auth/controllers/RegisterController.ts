import { RegisterInputDTO } from '../dtos/RegisterDTO'
import { Request, Response } from 'express'
import { RegisterRequestData } from '../request/RegisterRequestData'
import { IRegisterPresenter } from '../presenters/IRegisterPresenter'
import { IRegisterService } from '../userServices/IRegisterService'
import { RegisterResponseData } from '../response/RegisterResponseData'
export class RegisterController {
  private inputBoundary: IRegisterService
  private presenter: IRegisterPresenter

  constructor(inputBoundary: IRegisterService, presenter: IRegisterPresenter) {
    this.inputBoundary = inputBoundary
    this.presenter = presenter
  }

  execute = async (
    req: Request<object, object, RegisterInputDTO, object>,
    res: Response<RegisterResponseData>
  ) => {
    const inputData = new RegisterInputDTO(
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.confirmPassword
    )
    const inputRequestData = new RegisterRequestData(inputData)
    await this.inputBoundary.execute(inputRequestData)
    const viewModel = this.presenter.getData()

    res.status(viewModel.status).send(viewModel)
  }
}
