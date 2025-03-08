import { RegisterRequestData } from "../request/RegisterRequestData";

export interface IRegisterService {
    execute(data: RegisterRequestData): Promise<void>
    isValidEmail(email: string): boolean
    isValidPassword(password: string): boolean
    isValidTwoPassword(password: string, confirmPassword: string): boolean
    maHoaMatKhau(password: string): Promise<string>
}
