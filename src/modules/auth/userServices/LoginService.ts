/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginOutputDTO } from '../dtos/LoginDTO'
import { InputBoundary } from '../../../shared/interfaces/InputBoundary'
import { OutputBoundary } from '../../../shared/interfaces/OutputBoundary'
import { DatabaseBoundary } from '../../../shared/interfaces/DatabaseBoundary'
import { FindAccountInputDTO } from '../dtos/FindAccountDTO';
import { LoginResponseData } from '../response/LoginResponseData';
import { FindAccountByEmailRequestData } from '../request/FindAccountByEmailRequestData';
import { comparePassword } from '../../../utils/utils';
import { LoginRequestData } from '../request/LoginRequestData'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../../config/jwtConfig';
export class LoginService implements InputBoundary {
  presenter: OutputBoundary;
  database: DatabaseBoundary;
  findAccountService: InputBoundary;
  findAccountPresenter: OutputBoundary;
  constructor(presenter: OutputBoundary, database: DatabaseBoundary,findAccountService: InputBoundary, findAccountPresenter: OutputBoundary) {
    this.presenter = presenter;
    this.database = database;
    this.findAccountPresenter = findAccountPresenter;
    this.findAccountService = findAccountService
  }

  execute = async (data: LoginRequestData) => {

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
         const payload = {userId: result.userId,username: result.username, email: result.email, roles: result.roles}
         const jwtCode = await jwt.sign(payload,jwtConfig.secret,{expiresIn:jwtConfig.expiresIn})
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

