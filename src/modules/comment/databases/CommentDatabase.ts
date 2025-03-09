import { Comments } from '../../../entities/comments.entity'
import { AppDataSource } from '../../../config/data-source'
import { Reviews } from '../../../entities/reviews.entity'
import { Users } from '../../../entities/users.entity'
import { ICommentDatabase } from './ICommentDatabase'
import { CreateCommentInputDTO } from '../dtos/CreateCommentDTO'

export class CommentDatabase implements ICommentDatabase {
  async update(
    userId: string,
    commentId: string,
    content: string
  ): Promise<Comments> {
    const commentRepo = AppDataSource.getRepository(Comments)
    const comment = await commentRepo.findOne({
      where: { id: commentId, user: { id: userId } }
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    comment.text = content
    comment.updatedAt = new Date()

    return await commentRepo.save(comment)
  }

  async create(data: CreateCommentInputDTO): Promise<Comments> {
    if (!data.content) throw new Error('Content is required')
    const commentRepo = AppDataSource.getRepository(Comments)
    let lft: number
    let rgt: number

    if (!data.parentId || data.parentId === '') {
      // Bình luận gốc: tìm giá trị lớn nhất của rgt và đặt lft, rgt tiếp theo
      const maxRight = await commentRepo
        .createQueryBuilder('comment')
        .select('MAX(comment.rgt)', 'maxRight')
        .where('comment.reviews = :reviewId', { reviewId: data.reviewId }) // Lọc theo review
        .getRawOne()

      lft = (maxRight?.maxRight || 0) + 1
      rgt = lft + 1
    } else {
      // Bình luận con
      const parentComment: Comments | null = await commentRepo.findOne({
        where: { id: data.parentId }
      })

      if (!parentComment) {
        throw new Error('Parent comment not found')
      }

      lft = parentComment.rgt
      rgt = parentComment.rgt + 1

      // Dời các node để tạo chỗ trống
      await commentRepo
        .createQueryBuilder()
        .update(Comments)
        .set({ rgt: () => 'rgt + 2' })
        .where('rgt >= :rgt', { rgt: parentComment.rgt })
        .execute()

      await commentRepo
        .createQueryBuilder()
        .update(Comments)
        .set({ lft: () => 'lft + 2' })
        .where('lft > :rgt', { rgt: parentComment.rgt })
        .execute()
    }

    // Tạo comment mới
    const comment = new Comments()
    comment.text = data.content
    comment.lft = lft
    comment.rgt = rgt
    comment.parentId = data.parentId
    comment.user = await this.findUser(data.userId)
    comment.reviews = await this.findReview(data.reviewId)
    return await commentRepo.save(comment)
  }

  async getListCommentByReviewId(reviewId: string): Promise<Comments[]> {
    const commentRepo = AppDataSource.getRepository(Comments)
    const response = await commentRepo.find({
      where: { reviews: { id: reviewId } },
      order: { lft: 'ASC' },
      relations: ['user', 'parent'] // Thêm parent để lấy parentId
    })
    if (!response) throw new Error('Comment not found')
    return response
  }

  async findReview(reviewId: string): Promise<Reviews> {
    if (!reviewId) throw new Error('ReviewId not found')
    const reviewRepo = AppDataSource.getRepository(Reviews)
    const review = await reviewRepo.findOne({
      where: { id: reviewId },
      select: ['id', 'rating', 'content']
    })
    if (!review) throw new Error('Review not found')
    return review
  }

  async findUser(userId: string): Promise<Users> {
    if (!userId) throw new Error('UserId not found')
    const userRepo = AppDataSource.getRepository(Users)
    const user = await userRepo.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email', 'password', 'roles']
    })
    if (!user) throw new Error('User not found')
    return user
  }

  async findComment(commentId: string): Promise<Comments> {
    if (!commentId) throw new Error('CommentId not found')

    const commentRepo = AppDataSource.getRepository(Comments)
    const comment = await commentRepo.findOne({
      where: { id: commentId }, // Lọc theo commentId
      relations: ['user', 'parent'] // Thêm parent để lấy parentId
    })
    if (!comment) throw new Error('Comment not found')
    return comment
  }

  async findUserByCommentId(data: string): Promise<Users | null> {
    const commentRepo = AppDataSource.getRepository(Comments)
    const comment = await commentRepo.findOne({
      where: { id: data }
    })
    const userRepo = AppDataSource.getRepository(Users)
    const user = await userRepo.findOne({
      where: { id: comment?.user.id }
    })
    if (!user) throw new Error('User do not own this comment')
    return user
  }

  async delete(data: string): Promise<void> {
    const commentRepo = AppDataSource.getRepository(Comments)

    // Lấy thông tin comment cần xóa
    const comment = await commentRepo.findOne({ where: { id: data } })
    if (!comment) throw new Error('Comment not found')

    const width = comment.rgt - comment.lft + 1

    // Xóa toàn bộ comment con
    await commentRepo
      .createQueryBuilder()
      .delete()
      .where('lft BETWEEN :lft AND :rgt', {
        lft: comment.lft,
        rgt: comment.rgt
      })
      .execute()

    // Cập nhật lại lft, rgt của các node còn lại
    await commentRepo
      .createQueryBuilder()
      .update()
      .set({ lft: () => `lft - ${width}` })
      .where('lft > :rgt', { rgt: comment.rgt })
      .execute()

    await commentRepo
      .createQueryBuilder()
      .update()
      .set({ rgt: () => `rgt - ${width}` })
      .where('rgt > :rgt', { rgt: comment.rgt })
      .execute()
  }
}
