import { RefreshTokenInputDTO } from "../dtos/RefreshTokenDTO";

export class RefreshTokenRequestData {
    data: RefreshTokenInputDTO
    constructor(data: RefreshTokenInputDTO) {
        this.data = data
    }
}