import { InputBoundary } from '../../../shared/interfaces/InputBoundary'
import {OutputBoundary} from "../../../shared/interfaces/OutputBoundary";
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { ICreateCommentDatabase } from '../databases/ICreateCommentDatabase'
import { CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'

export class CreateCommentService implements InputBoundary {
    _createCommentPresenter: OutputBoundary
    _createCommentDatabase: ICreateCommentDatabase
    constructor(createCommentPresenter: OutputBoundary, createCommentDatabase: ICreateCommentDatabase) {
        this._createCommentPresenter = createCommentPresenter;
        this._createCommentDatabase = createCommentDatabase;
    }

    async execute(data: CreateCommentRequestData): Promise<void> {
        const user = await this._createCommentDatabase.findUser(data.data.userId)
        if (!user) {
          const outputDTO = new CreateCommentOutputDTO()
            const resData = new CreateCommentResponseData(400, "User not found", outputDTO)
            await this._createCommentPresenter.execute(resData)
            return
        }

        const review = await this._createCommentDatabase.findReview(data.data.reviewId)
        if (!review) {
          const outputDTO = new CreateCommentOutputDTO()
            const resData = new CreateCommentResponseData(400, "Review not found", outputDTO)
            await this._createCommentPresenter.execute(resData)
            return
        }
        const comment = await this._createCommentDatabase.execute(data.data)
        if (!comment) {
            const outputDTO = new CreateCommentOutputDTO()
            const resData = new CreateCommentResponseData(400, "Comment not found", outputDTO)
            await this._createCommentPresenter.execute(resData)
            return
        }
        const outputDTO = new CreateCommentOutputDTO()
        const resData = new CreateCommentResponseData(201, "Success", outputDTO)
        await this._createCommentPresenter.execute(resData)
        return
    }
}