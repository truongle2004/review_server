import { Comments } from '../../../entities/comments.entity'
import { AppDataSource } from '../../../config/data-source'
import { Reviews } from '../../../entities/reviews.entity'
import { Users } from '../../../entities/users.entity'
import { ICreateCommentDatabase } from './ICreateCommentDatabase'
import { CreateCommentInputDTO } from '../dtos/CreateCommentDTO'

export class CreateCommentDatabase implements ICreateCommentDatabase {
  async execute(data: CreateCommentInputDTO): Promise<Comments> {
    const commentRepo = AppDataSource.getRepository(Comments);
    let lft: number;
    let rgt: number;

    if (!data.parentId || data.parentId === '') {
      // Bình luận gốc: tìm giá trị lớn nhất của rgt và đặt lft, rgt tiếp theo
      const maxRight = await commentRepo
        .createQueryBuilder("comment")
        .select("MAX(comment.rgt)", "maxRight")
        .getRawOne();

      lft = (maxRight?.maxRight || 0) + 1;
      rgt = lft + 1;
    } else {
      // Bình luận con
      const parentComment = await commentRepo.findOne({
        where: { id: data.parentId }
      });

      if (!parentComment) {
        throw new Error("Parent comment not found");
      }

      lft = parentComment.rgt;
      rgt = parentComment.rgt + 1;

      // Dời các node để tạo chỗ trống
      await commentRepo
        .createQueryBuilder()
        .update(Comments)
        .set({ rgt: () => "rgt + 2" })
        .where("rgt >= :rgt", { rgt: parentComment.rgt })
        .execute();

      await commentRepo
        .createQueryBuilder()
        .update(Comments)
        .set({ lft: () => "lft + 2" })
        .where("lft > :rgt", { rgt: parentComment.rgt })
        .execute();
    }

    // Tạo comment mới
    const comment = new Comments();
    comment.text = data.content;
    comment.lft = lft;
    comment.rgt = rgt;
    comment.parentId = data.parentId || null;
    comment.user = await this.findUser(data.userId);
    comment.reviews = await this.findReview(data.reviewId);

    return await commentRepo.save(comment);
  }

  async findReview(reviewId: string): Promise<Reviews> {
    const reviewRepo = AppDataSource.getRepository(Reviews);
    const review = await reviewRepo.findOne({ where: { id: reviewId } });
    if (!review) throw new Error("Review not found");
    return review;
  }

  async findUser(userId: string): Promise<Users> {
    const userRepo = AppDataSource.getRepository(Users);
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }

  updateLeftAndRight(commentId: string, left: number, right: number): Promise<any> {
    return Promise.resolve(undefined)
  }
}
