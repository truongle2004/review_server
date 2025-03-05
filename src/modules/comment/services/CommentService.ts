import {OutputBoundary} from "../../../shared/interfaces/OutputBoundary";
import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { ICommentDatabase } from '../databases/ICommentDatabase'
import { CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { ICommentService } from './ICommentService'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'
import { Comments } from '../../../entities/comments.entity'
import { GetListCommentByReviewIdOutputDTO } from '../dtos/GetListCommentByReviewIdDTO'
import { ICommentPresenter } from '../presenters/ICommentPresenter'
import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'

export class CommentService implements ICommentService {
    _commentPresenter:ICommentPresenter
    _commentDatabase: ICommentDatabase
    constructor(createCommentPresenter: ICommentPresenter, createCommentDatabase: ICommentDatabase) {
        this._commentPresenter = createCommentPresenter;
        this._commentDatabase = createCommentDatabase;
    }

    async create(data: CreateCommentRequestData): Promise<void> {
        const user = await this._commentDatabase.findUser(data.data.userId)
        if (!user) {
          const outputDTO = new CreateCommentOutputDTO()
            const resData = new CreateCommentResponseData(400, "User not found", outputDTO)
            await this._commentPresenter.createCommentPresenter(resData)
            return
        }

        const review = await this._commentDatabase.findReview(data.data.reviewId)
        if (!review) {
          const outputDTO = new CreateCommentOutputDTO()
            const resData = new CreateCommentResponseData(400, "Review not found", outputDTO)
            await this._commentPresenter.createCommentPresenter(resData)
            return
        }
        const comment = await this._commentDatabase.create(data.data)
        if (!comment) {
            const outputDTO = new CreateCommentOutputDTO()
            const resData = new CreateCommentResponseData(400, "Comment not found", outputDTO)
            await this._commentPresenter.createCommentPresenter(resData)
            return
        }
        const outputDTO = new CreateCommentOutputDTO()
        const resData = new CreateCommentResponseData(201, "Success", outputDTO)
        await this._commentPresenter.createCommentPresenter(resData)
        return
    }

    async getListCommentByReviewId(data: GetListCommentByReviewIdRequestData): Promise<void> {
      const{reviewId} = data.data
      const comments = await this._commentDatabase.getListCommentByReviewId(reviewId)

      if (!comments) {
        const outputDTO = new GetListCommentByReviewIdOutputDTO([])
        const resData = new GetListCommentByReviewIdResponseData(400, "No Comment Found", outputDTO)
        await this._commentPresenter.getListCommentByReviewIdPresenter(resData)
        return
      }

      const tree = this.buildCommentTree(comments)
      const outputDTO = new GetListCommentByReviewIdOutputDTO(tree)
      const resData = new GetListCommentByReviewIdResponseData(200, "Success", outputDTO)
      await this._commentPresenter.getListCommentByReviewIdPresenter(resData)
      console.log("TREEE::::::::::::::::", tree)
      return
  }

  buildCommentTree(comments: Comments[]): any[] {
    const commentMap = new Map<string, any>();
    const tree: any[] = [];

    comments.forEach((comment) => {
      commentMap.set(comment.id, {
        id: comment.id,
        text: comment.text,
        user: {
          id: comment.user.id,
          name: comment.user.username,
        },
        children: [],
      });
    });

    comments.forEach((comment) => {
      const mappedComment = commentMap.get(comment.id);
      if (comment.parent) {
        const parent = commentMap.get(comment.parent.id);
        if (parent) {
          parent.children.push(mappedComment);
        }
      } else {
        tree.push(mappedComment); // Nếu không có cha, đây là node gốc
      }
    });

    return tree;
  }
}