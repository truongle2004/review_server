import { CreateCommentRequestData } from '../request/CreateCommentRequestData'
import { ICommentDatabase } from '../databases/ICommentDatabase'
import { CreateCommentOutputDTO } from '../dtos/CreateCommentDTO'
import { CreateCommentResponseData } from '../response/CreateCommentResponseData'
import { ICommentService } from './ICommentService'
import { GetListCommentByReviewIdRequestData } from '../request/GetListCommentByReviewIdRequestData'
import {
  GetListCommentByReviewIdOutputDTO,
  ProfileDto,
  UserDto
} from '../dtos/GetListCommentByReviewIdDTO'
import { ICommentPresenter } from '../presenters/ICommentPresenter'
import { GetListCommentByReviewIdResponseData } from '../response/GetListCommentByReviewIdResponseData'
import { UpdateCommentRequestData } from '../request/UpdateCommentRequestData'
import { UpdateCommentOutputDTO } from '../dtos/UpdateCommentDTO'
import { UpdateCommentResponseData } from '../response/UpdateCommnetResponseData'
import { DeleteCommentRequestData } from '../request/DeleteCommentRequestData'
import { DeleteCommentOutputDTO } from '../dtos/DeleteCommentDTO'
import { DeleteCommentResponseData } from '../response/DeleteCommentResponseData'
import { log } from 'console'
import { IProfileDatabase } from '../../profile/databases/IProfileDatabase'

export class CommentService implements ICommentService {
  _commentPresenter: ICommentPresenter
  _commentDatabase: ICommentDatabase
  _profileDatabase: IProfileDatabase
  constructor(
    createCommentPresenter: ICommentPresenter,
    createCommentDatabase: ICommentDatabase,
    profileDatabase: IProfileDatabase
  ) {
    this._commentPresenter = createCommentPresenter
    this._commentDatabase = createCommentDatabase
    this._profileDatabase = profileDatabase
  }

  async create(data: CreateCommentRequestData): Promise<void> {
    try {
      const user = await this._commentDatabase.findUser(data.data.userId)
      if (!user) {
        this._sendErrorResponse(404, 'User not found')
        return
      }
      const review = await this._commentDatabase.findReview(data.data.reviewId)
      if (!review) {
        this._sendErrorResponse(404, 'Review not found')
        return
      }
      const comment = await this._commentDatabase.create(data.data)
      const outputDTO = new CreateCommentOutputDTO()
      const resData = new CreateCommentResponseData(
        201,
        'Created success',
        outputDTO
      )
      await this._commentPresenter.createCommentPresenter(resData)
      return
    } catch (error) {
      this._sendErrorResponse(404, (error as Error).message)
      return
    }
  }

  async getListCommentByReviewId(
    data: GetListCommentByReviewIdRequestData
  ): Promise<void> {
    const { reviewId } = data.data

    try {
      const review = await this._commentDatabase.findReview(reviewId)
      if (!review) {
        return this._sendErrorResponse(404, 'Review not found')
      }

      const comments =
        await this._commentDatabase.getListCommentByReviewId(reviewId)
      if (!comments || comments.length === 0) {
        return this._sendErrorResponse(404, 'No Comment Found')
      }

      const userIds = [...new Set(comments.map((c) => c.user.id))]

      const usersData =
        await this._profileDatabase.findUsersWithProfiles(userIds)

      const usersMap = new Map(usersData.map((user) => [user.id, user]))

      const listData: GetListCommentByReviewIdOutputDTO[] = comments.map(
        (comment) => {
          const data = new GetListCommentByReviewIdOutputDTO()
          data.commentId = comment.id
          data.content = comment.text
          data.imagesUrl = comment.images
          data.parentId = comment.parentId

          const userDB = usersMap.get(comment.user.id)
          if (userDB) {
            const user = new UserDto()
            user.id = userDB.id
            user.username = userDB.username
            user.email = userDB.email
            user.roles = userDB.roles

            if (userDB.profile) {
              const profile = new ProfileDto()
              profile.id = userDB.profile.id
              profile.profile_picture = userDB.profile.profile_picture || ''
              profile.country = userDB.profile.country || ''
              profile.birthday = userDB.profile.birthday || new Date()
              profile.gender = userDB.profile.gender || ''
              profile.bio = userDB.profile.bio || ''

              user.profile = profile
            } else {
              user.profile = null
            }

            data.user = user
          }

          return data
        }
      )

      await this._commentPresenter.getListCommentByReviewIdPresenter(
        new GetListCommentByReviewIdResponseData(200, 'Success', listData)
      )
    } catch (err) {
      return this._sendErrorResponse(500, (err as Error).message)
    }
  }
  async update(data: UpdateCommentRequestData): Promise<void> {
    try {
      const { userId, reviewId, commentId, content } = data.data

      // Kiểm tra đầu vào
      if (!content) throw new Error('Content is required')
      if (!userId) throw new Error('User id is required')
      if (!reviewId) throw new Error('Review id is required')

      // Kiểm tra user
      const resUser = await this._commentDatabase.findUser(userId)
      if (!resUser) throw new Error('User not found')

      // Kiểm tra review (không cần gán biến nếu chỉ kiểm tra tồn tại)
      if (!(await this._commentDatabase.findReview(reviewId))) {
        throw new Error('Review not found')
      }

      // Kiểm tra comment
      const res = await this._commentDatabase.findComment(commentId)
      if (!res) throw new Error('Comment not found')
      if (res.user.id !== userId) throw new Error('You do not own this comment')

      // Cập nhật comment
      await this._commentDatabase.update(userId, commentId, content)

      // Chuẩn bị phản hồi
      const outputDTO = new UpdateCommentOutputDTO()
      const resData = new UpdateCommentResponseData(200, 'Success', outputDTO)
      await this._commentPresenter.updateCommentPresenter(resData)
    } catch (error) {
      await this._sendErrorResponse(400, (error as Error).message)
    }
  }

  async delete(data: DeleteCommentRequestData): Promise<void> {
    const { userId, commentId, reviewId, parentId } = data.data
    log(userId, commentId, reviewId, parentId)

    // kiểm tra xem bài review có tồn tại hay không ?
    try {
      const res = await this._commentDatabase.findReview(reviewId)
    } catch (err) {
      const dto = new DeleteCommentOutputDTO()
      const resData = new DeleteCommentResponseData(
        404,
        (err as Error).message,
        dto
      )
      await this._commentPresenter.deleteCommentPresenter(resData)
      return
    }

    // kiểm tra xem comment có tồn tại hay không ?

    try {
      const res = await this._commentDatabase.findComment(commentId)
    } catch (err) {
      const dto = new DeleteCommentOutputDTO()
      const resData = new DeleteCommentResponseData(
        404,
        (err as Error).message,
        dto
      )
      await this._commentPresenter.deleteCommentPresenter(resData)
      return
    }

    // kiểm tra cái người đó có phải là chủ nhân của comment hay không
    try {
      const res = await this._commentDatabase.findComment(commentId)
      if (res.user.id != userId) {
        const dto = new DeleteCommentOutputDTO()
        const resData = new DeleteCommentResponseData(
          400,
          'You do not own this comment',
          dto
        )
        await this._commentPresenter.deleteCommentPresenter(resData)
        return
      }
    } catch (error) {
      const dto = new DeleteCommentOutputDTO()
      const resData = new DeleteCommentResponseData(
        404,
        (error as Error).message,
        dto
      )
      await this._commentPresenter.deleteCommentPresenter(resData)
      return
    }

    try {
      await this._commentDatabase.delete(commentId)
      const outputDTO = new DeleteCommentOutputDTO()
      const resData = new DeleteCommentResponseData(200, 'Success', outputDTO)
      await this._commentPresenter.deleteCommentPresenter(resData)
      return
    } catch (error) {
      const outputDTO = new DeleteCommentOutputDTO()
      const resData = new DeleteCommentResponseData(
        400,
        (error as Error).message,
        outputDTO
      )
      await this._commentPresenter.deleteCommentPresenter(resData)
      return
    }
  }
  // buildCommentTree(comments: Comments[]): any[] {
  //   const commentMap = new Map<string, any>()
  //   const tree: any[] = []

  //   comments.forEach((comment) => {
  //     commentMap.set(comment.id, {
  //       id: comment.id,
  //       text: comment.text,
  //       user: {
  //         id: comment.user.id,
  //         name: comment.user.username
  //       },
  //       images: JSON.parse(comment.images),
  //       children: []
  //     })
  //   })

  //   comments.forEach((comment) => {
  //     const mappedComment = commentMap.get(comment.id)
  //     if (comment.parent) {
  //       const parent = commentMap.get(comment.parent.id)
  //       if (parent) {
  //         parent.children.push(mappedComment)
  //       }
  //     } else {
  //       tree.push(mappedComment) // Nếu không có cha, đây là node gốc
  //     }
  //   })

  //   return tree
  // }
  async _sendErrorResponse(status: number, message: string): Promise<void> {
    const resData = new UpdateCommentResponseData(status, message, [])
    await this._commentPresenter.updateCommentPresenter(resData)
  }
}
