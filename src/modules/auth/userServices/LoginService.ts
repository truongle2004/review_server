/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginInputDTO, LoginOutputDTO } from '../dtos/LoginDTO'
import { InputBoundary } from '../interfaces/InputBoundary'
import { OutputBoundary } from '../interfaces/OutputBoundary'
import { DatabaseBoundary } from '../interfaces/DatabaseBoundary'
import {RequestData} from "../interfaces/RequestData";
import {ITokenService} from "../tokenServices/ITokenService";
import { FindAccountInputDTO } from '../dtos/FindAccountDTO';
import { LoginResponseData } from '../response/LoginResponseData';
import { FindAccountByEmailRequestData } from '../request/FindAccountByEmailRequestData';
import { comparePassword } from '../../../utils/utils';
import { injectAllWithTransform } from 'tsyringe'

export class LoginService implements InputBoundary {
  presenter: OutputBoundary;
  database: DatabaseBoundary;
  tokenService: ITokenService;
  findAccountService: InputBoundary;
  findAccountPresenter: OutputBoundary;
  constructor(presenter: OutputBoundary, database: DatabaseBoundary, tokenService: ITokenService,findAccountService: InputBoundary, findAccountPresenter: OutputBoundary) {
    this.presenter = presenter;
    this.database = database;
    this.tokenService = tokenService;
    this.findAccountPresenter = findAccountPresenter;
    this.findAccountService = findAccountService
  }

  execute = async (data: RequestData<LoginInputDTO>) => {

    const {email, password}  = data.data
    const isValidEmail : boolean = this.isValidEmail(email);
    const isValidPassword :boolean= this.isValidPassword(password);

    // kiểm tra email
    if (!isValidEmail) {
      const dto = new LoginOutputDTO("")
      const responseData = new LoginResponseData(400,"Invalid email", dto)
       await this.presenter.execute(responseData)
      return
    }
    if(!isValidPassword){
      const dto = new LoginOutputDTO("")
      const responseData = new LoginResponseData(400, "Password must be at least 8 characters", dto)
     await this.presenter.execute(responseData)
      return
    }

   try{
      const dataInput = new FindAccountInputDTO(email)
     const requestData = new FindAccountByEmailRequestData(dataInput)
     await this.findAccountService.execute(requestData)
     const result = await this.findAccountPresenter.getDataViewModel()
     console.log("GetDataViewModelFindAccountByEmail:::  "+result)
     if (result.isSuccess === "Fail") {
       const dto = new LoginOutputDTO("")
       const responseData = new LoginResponseData(400, result.message, dto)
       await this.presenter.execute(responseData)
       return
     }else{
       if (!await comparePassword(password, result.password)) {
         const dto = new LoginOutputDTO("")
         const responseData = new  LoginResponseData(400, "Password is incorrect", dto)
          this.presenter.execute(responseData)
         return
       } else {
         const payload = {email: result.email, roles: result.roles}
         const jwtCode = await this.tokenService.generateToken(payload)
         const dto = new LoginOutputDTO(jwtCode)
         const responseData = new LoginResponseData(200, "Login successfully", dto)
         await this.presenter.execute(responseData)
         return
       }
     }
   }catch (error:any) {
      const dto = new LoginOutputDTO("")
      const responseData = new LoginResponseData(400, error.message, dto)
      await this.presenter.execute(responseData)
      return
   }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  }
  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

}

