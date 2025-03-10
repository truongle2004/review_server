import {LoginInputDTO} from "../dtos/LoginDTO";

export class LoginRequestData  {
    data: LoginInputDTO;
    constructor(data: LoginInputDTO) {
        this.data = data;
    }
}