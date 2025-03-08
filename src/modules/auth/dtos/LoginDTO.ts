
export class LoginInputDTO {
    email: string
    password: string
    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}

export class LoginOutputDTO {
    accessToken: string
    refreshToken:string
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken  
        this.refreshToken = refreshToken
    }
}