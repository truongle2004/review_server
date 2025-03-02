
/* eslint-disable @typescript-eslint/no-explicit-any */

import { v4 } from "uuid";
import { Role, Status, Users } from "../../../entities/users.entity";
import { hashPassword } from "../../../utils/utils";
import { FindAccountInputDTO } from "../dtos/FindAccountDTO";
import { RegisterOutputDTO } from "../dtos/RegisterDTO";
import { DatabaseBoundary } from "../../../shared/interfaces/DatabaseBoundary";
import { InputBoundary } from "../../../shared/interfaces/InputBoundary";
import { OutputBoundary } from "../../../shared/interfaces/OutputBoundary";
import { FindAccountByEmailRequestData } from "../request/FindAccountByEmailRequestData";
import { RegisterResponseData } from "../response/RegisterResponseData";
import { FindAccountByEmailViewModel } from "../view_model/FindAccountByEmailViewModel";
import { RegisterRequestData } from '../request/RegisterRequestData'

export class RegisterService implements InputBoundary {

    private registerDatabase: DatabaseBoundary;
    private presenter: OutputBoundary;
    private findAccountService: InputBoundary;
    private findAccountPresenter: OutputBoundary;
    constructor(database: DatabaseBoundary, presenter: OutputBoundary, findAccountService: InputBoundary, findAccountPresenter: OutputBoundary) {
        this.registerDatabase = database;
        this.presenter = presenter;
        this.findAccountService = findAccountService;
        this.findAccountPresenter = findAccountPresenter;
    }

    async execute(data: RegisterRequestData): Promise<any> {
        const {email, password, confirmPassword} = data.data
        console.log(email, password, confirmPassword)
        const isValidEmail : boolean = this.isValidEmail(email);
        const isValidPassword :boolean= this.isValidPassword(password);
        const isValidTwoPassword :boolean= this.isValidTwoPassword(password, confirmPassword);

        // kiểm tra email
        if (!isValidEmail) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData( 400, "Invalid email",dto)
            this.presenter.execute(responseData)
            return
        }

        // kiem tra password
        if (!isValidPassword) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400,"Password must be at least 8 characters", dto)
            this.presenter.execute(responseData)
            return
        }

        // kiem tra hai password
        if (!isValidTwoPassword) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400, "Password does not match", dto)
            this.presenter.execute(responseData)
            return
        }
        try{
            const dataInput = new FindAccountInputDTO(email)
            const requestData = new FindAccountByEmailRequestData(dataInput)
            await this.findAccountService.execute(requestData)
            const result:FindAccountByEmailViewModel = await this.findAccountPresenter.getDataViewModel()
            if (result.isSuccess === "Success"){
                const dto = new RegisterOutputDTO()
                const responseData = new RegisterResponseData(400, "Email already exists", dto)
                this.presenter.execute(responseData)
                return
            }else {
                try {
                    //mã hoá mật khẩu
                    const hashedPassword = await this.maHoaMatKhau(password)
                    const uuid = v4()
                    const user = new Users(uuid, email, hashedPassword, Status.ACTIVE, Role.USER)
                    const responseFromDatabase = await this.registerDatabase.execute(user)
                    console.log(responseFromDatabase)
                    if (responseFromDatabase[0]){
                        const dto = new RegisterOutputDTO()
                        const responseData = new RegisterResponseData(400, "Register fail", dto)
                        this.presenter.execute(responseData)
                        return
                    }else {
                        const dto = new RegisterOutputDTO()
                        const responseData = new RegisterResponseData(200, "Register successfully", dto)
                        this.presenter.execute(responseData)
                        return
                    }
                }catch (error:any) {
                    const dto = new RegisterOutputDTO()
                    const  responseData = new RegisterResponseData(400, error.message, dto)
                    this.presenter.execute(responseData)
                    return
                }
            }
            // console.log(result)
        }catch (error : any) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400, error.message, dto)
            this.presenter.execute(responseData)
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
    private isValidTwoPassword(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }
    private async maHoaMatKhau(password: string): Promise<string> {
        return hashPassword(password).then( hashedPassword => hashedPassword).catch( error => error);
    }
}

