import { InputBoundary } from '../../../shared/interfaces/InputBoundary'
import {OutputBoundary} from "../../../shared/interfaces/OutputBoundary";
import {DatabaseBoundary} from "../../../shared/interfaces/DatabaseBoundary";
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'

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

    async execute(data: CreateCommentRequestData): Promise<void> {
        console.log(data)
        throw new Error('Method not implemented.')
    }
}