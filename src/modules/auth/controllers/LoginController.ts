/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express'
import { InputBoundary } from '../../../shared/interfaces/InputBoundary';
import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary';
import { LoginInputDTO, LoginOutputDTO } from '../dtos/LoginDTO';
import { LoginRequestData } from '../request/LoginRequestData';

export class LoginController{
  loginService:InputBoundary;
  presenter:OutputBoundary;

  constructor(loginService: InputBoundary, presenter:OutputBoundary){
    this.loginService = loginService;
    this.presenter = presenter
  }

  execute = async (req:Request<{}, {}, LoginInputDTO>, res:Response<LoginOutputDTO>) => {
    const inputData = new LoginInputDTO(req.body.email, req.body.password)
    const loginRequestData = new LoginRequestData(inputData)
    await this.loginService.execute(loginRequestData)
    await res.send(this.presenter.getDataViewModel())
    console.log(this.presenter.getDataViewModel())
  }
}



