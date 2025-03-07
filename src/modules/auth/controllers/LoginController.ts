import { Request, Response } from 'express'
import { LoginInputDTO, LoginOutputDTO } from '../dtos/LoginDTO';
import { LoginRequestData } from '../request/LoginRequestData';
import { ILoginPresenter } from '../presenters/ILoginPresenter';
import { ILoginService } from '../userServices/ILoginService';
export class LoginController{
  loginService:ILoginService;
  presenter:ILoginPresenter;

  constructor(loginService: ILoginService, presenter:ILoginPresenter){
    this.loginService = loginService;
    this.presenter = presenter
  }

  execute = async (req:Request<LoginInputDTO>, res:Response<LoginOutputDTO>) => {
    const inputData = new LoginInputDTO(req.body.email, req.body.password)
    
    const loginRequestData = new LoginRequestData(inputData)
    await this.loginService.execute(loginRequestData)

    const viewModel = this.presenter.getData()
    res.status(viewModel.status).send(viewModel)
  }
}



