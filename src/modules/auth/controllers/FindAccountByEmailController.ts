/* eslint-disable @typescript-eslint/no-empty-object-type */
import {Request,Response} from "express";
import { InputBoundary } from "../interfaces/InputBoundary";
import { OutputBoundary } from "../interfaces/OutputBoundary";
import { FindAccountInputDTO, FindAccountOutputDTO } from "../dtos/FindAccountDTO";
import { FindAccountByEmailRequestData } from "../request/FindAccountByEmailRequestData";

export class FindAccountByEmailController {
    findAccountService: InputBoundary;
    presenter: OutputBoundary;
    constructor(findAccountService: InputBoundary, presenter: OutputBoundary) {
        this.findAccountService = findAccountService;
        this.presenter = presenter;
    }
    execute = async (req: Request<{},{},FindAccountInputDTO,{}>, res: Response<FindAccountOutputDTO>) => {
        const inputData = new FindAccountInputDTO(req.body.email);
        const inputRequestData = new FindAccountByEmailRequestData(inputData)
        await this.findAccountService.execute(inputRequestData)
        res.send(this.presenter.getDataViewModel());
    };
}