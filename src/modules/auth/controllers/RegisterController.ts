/* eslint-disable @typescript-eslint/no-empty-object-type */
import { RegisterInputDTO, RegisterOutputDTO } from "../dtos/RegisterDTO";
import { InputBoundary } from "../interfaces/InputBoundary";
import { OutputBoundary } from "../interfaces/OutputBoundary";
import { Request, Response } from "express";
import { RegisterRequestData } from '../request/RegisterRequestData'
export class RegisterController {
    private inputBoundary: InputBoundary;
    private presenter: OutputBoundary;

    constructor(inputBoundary: InputBoundary, presenter: OutputBoundary) {
        this.inputBoundary = inputBoundary;
        this.presenter = presenter;
    }

    execute = async (req:Request<{},{},RegisterInputDTO,{}>,res:Response<RegisterOutputDTO>) => {
        const inputData = new RegisterInputDTO(req.body.email, req.body.password, req.body.confirmPassword)
        const inputRequestData = new RegisterRequestData(inputData)
       await this.inputBoundary.execute(inputRequestData)
        res.send(this.presenter.getDataViewModel())
    }
}