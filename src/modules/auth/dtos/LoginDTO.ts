
export class LoginInputDTO {
    email: string
    password: string
    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}

export class LoginOutputDTO {
    jwtCode: string
    constructor(jwtCode: string) {
        this.jwtCode = jwtCode
    }
}