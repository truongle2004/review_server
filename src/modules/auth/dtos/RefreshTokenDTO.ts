export class RefreshTokenInputDTO{
    refreshToken: string

    constructor(refreshToken: string) {
        this.refreshToken = refreshToken
    }
}

export class RefreshTokenOutputDTO{
    accessToken: string
    constructor(accessToken: string) {
        this.accessToken = accessToken
    }
}