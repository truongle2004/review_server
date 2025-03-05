import { Comments } from '../../../entities/comments.entity'
import { AppDataSource } from '../../../config/data-source'
import { Reviews } from '../../../entities/reviews.entity'
import { Users } from '../../../entities/users.entity'
import { ICommentDatabase } from './ICommentDatabase'
import { CreateCommentInputDTO } from '../dtos/CreateCommentDTO'

export class CommentDatabase implements ICommentDatabase {
  async create(data: CreateCommentInputDTO): Promise<Comments> {
    const commentRepo = AppDataSource.getRepository(Comments);
    let lft: number;
    let rgt: number;

    if (!data.parentId || data.parentId === '') {
      // Bình luận gốc: tìm giá trị lớn nhất của rgt và đặt lft, rgt tiếp theo
      const maxRight = await commentRepo
        .createQueryBuilder("comment")
        .select("MAX(comment.rgt)", "maxRight")
        .where("comment.reviews = :reviewId", { reviewId: data.reviewId }) // Lọc theo review
        .getRawOne();

      lft = (maxRight?.maxRight || 0) + 1;
      rgt = lft + 1;
    } else {
      // Bình luận con
      const parentComment:Comments | null = await commentRepo.findOne({
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
    comment.parentId = data.parentId;
    comment.user = await this.findUser(data.userId);
    comment.reviews = await this.findReview(data.reviewId);
    return await commentRepo.save(comment);
  }

  async getListCommentByReviewId(reviewId: string): Promise<any> {
    const commentRepo = AppDataSource.getRepository(Comments);
    const response = await commentRepo.find({
      where: { reviews: { id: reviewId } },
      order: { lft: "ASC" },
      relations: ["user", "parent"], // Thêm parent để lấy parentId
    });

    return response;
  }



  async findReview(reviewId: string): Promise<Reviews> {
    const reviewRepo = AppDataSource.getRepository(Reviews);
    const review = await reviewRepo.findOne({ where: { id: reviewId } ,
      relations: ["user"],  // Thêm relations để lấy dữ liệu
      select: ["id", "rating", "content"]
    });
    console.log(review)
    if (!review) throw new Error("Review not found");
    return review;
  }

  async findUser(userId: string): Promise<Users> {
    const userRepo = AppDataSource.getRepository(Users);
    const user = await userRepo.findOne({ where: { id: userId } ,
    select: ["id","username","email", "password", "roles"] });
    if (!user) throw new Error("User not found");
    return user;
  }

}
