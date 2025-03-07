import { v4 } from 'uuid'
import { hashPassword } from '../../../utils/utils'
import { RegisterOutputDTO } from '../dtos/RegisterDTO'
import { RegisterResponseData } from '../response/RegisterResponseData'
import { RegisterRequestData } from '../request/RegisterRequestData'
import { IRegisterDatabase } from '../databases/IRegisterDatabase'
import { Users } from '../../../entities/users.entity'
import { IRegisterPresenter } from '../presenters/IRegisterPresenter'
import { IRegisterService } from './IRegisterService'

export class RegisterService implements IRegisterService {
    private registerDatabase: IRegisterDatabase
    private presenter:IRegisterPresenter 
    constructor(database: IRegisterDatabase, presenter: IRegisterPresenter) {
        this.registerDatabase = database
        this.presenter = presenter
    }

    async execute(data: RegisterRequestData): Promise<void> {
        const { username, email, password, confirmPassword } = data.data
        // kiểm tra hợp lệ
        const isValidEmail: boolean = this.isValidEmail(email)
        const isValidPassword: boolean = this.isValidPassword(password)
        const isValidTwoPassword: boolean = this.isValidTwoPassword(
            password,
            confirmPassword
        )

        // kiểm tra email
        if (!isValidEmail) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400, 'Invalid email', dto)
            this.presenter.execute(responseData)
            return
        }

        // kiem tra password
        if (!isValidPassword) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400, 'Password must be at least 8 characters', dto)
            this.presenter.execute(responseData)
            return
        }

        // kiem tra hai password
        if (!isValidTwoPassword) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400, 'Password and confirm password do not match', dto)
            this.presenter.execute(responseData)
            return
        }

        try {
            // gọi database tìm kiếm email
            const account = await this.registerDatabase.findAccountByEmail(email)
            // nếu không tồn tại email thì mới cho tạo mới email
            if (!account) {
                try {
                    //mã hoá mật khẩu
                    const hashedPassword = await this.maHoaMatKhau(password)
                    const uuid = v4()
                    const user = new Users()
                    user.id = uuid
                    user.username = username
                    user.password = hashedPassword
                    user.email = email
                    //role va status mac dinh la USER va ACTIVE
                    const responseFromDatabase = await this.registerDatabase.execute(user)
                    console.log(responseFromDatabase)
                    if (responseFromDatabase) {
                        const dto = new RegisterOutputDTO()
                        const responseData = new RegisterResponseData(200, 'Register successfully', dto)
                        this.presenter.execute(responseData)
                        return
                    } else {
                        const dto = new RegisterOutputDTO()
                        const responseData = new RegisterResponseData(400, 'Register failed', dto)
                        this.presenter.execute(responseData)
                        return
                    }
                } catch (error) {
                    const dto = new RegisterOutputDTO()
                    const responseData = new RegisterResponseData(400, error.message, dto)
                    this.presenter.execute(responseData)
                    return
                }
            }else{
                // còn không thì response về email đã tồn tại, không cho tạo mới
                const dto = new RegisterOutputDTO() 
                const responseData = new RegisterResponseData(400, 'Email already exists', dto)
                this.presenter.execute(responseData)
                return
            }
        } catch (error) {
            const dto = new RegisterOutputDTO()
            const responseData = new RegisterResponseData(400, error.message, dto)
            this.presenter.execute(responseData)
            return
        }
    }

     isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
        return emailRegex.test(email)
    }
     isValidPassword(password: string): boolean {
        return password.length >= 8
    }
     isValidTwoPassword(
        password: string,
        confirmPassword: string
    ): boolean {
        return password === confirmPassword
    }
     async maHoaMatKhau(password: string): Promise<string> {
        return hashPassword(password)
            .then((hashedPassword) => hashedPassword)
            .catch((error) => error)
    }
}
