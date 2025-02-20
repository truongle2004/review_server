import { InputBoundary } from '../../../shared/interfaces/InputBoundary'
import { RequestData } from '../../../shared/interfaces/RequestData'
import {CreateCommentInputDTO} from "../dtos/CreateCommentDTO";
import {OutputBoundary} from "../../../shared/interfaces/OutputBoundary";
import {DatabaseBoundary} from "../../../shared/interfaces/DatabaseBoundary";
import {Comments} from "../../../entities/comments.entity";
import {randomUUID} from "node:crypto";
import {Reviews} from "../../../entities/reviews.entity";
import {Users} from "../../../entities/users.entity";

export class CreateCommentService implements InputBoundary {
    _createCommentPresenter: OutputBoundary
    _createCommentDatabase:DatabaseBoundary
    _findReviewDatabase:DatabaseBoundary
    _findUserDatabase:DatabaseBoundary
    constructor(createCommentPresenter: OutputBoundary, createCommentDatabase: DatabaseBoundary, findReviewDatabase: DatabaseBoundary,findUserDatabase: DatabaseBoundary) {
        this._createCommentPresenter = createCommentPresenter;
        this._createCommentDatabase = createCommentDatabase;
        this._findReviewDatabase = findReviewDatabase;
        this._findUserDatabase = findUserDatabase
    }

    async execute(data: RequestData<CreateCommentInputDTO>): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {userId, reviewId, parentId, content} = data.data
        const review: Reviews = await this._findReviewDatabase.execute(reviewId)
        const user:Users = await this._findUserDatabase.execute(userId)
        const comment = new Comments(randomUUID(), content, parentId, user, review)

        await this._createCommentDatabase.execute(comment)

        throw new Error('Method not implemented.')
    }
}