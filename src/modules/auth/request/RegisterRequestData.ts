import {RegisterInputDTO} from "../dtos/RegisterDTO";

export class RegisterRequestData  {
    data: RegisterInputDTO;
    constructor(data: RegisterInputDTO) {
        this.data = data;
    }
}