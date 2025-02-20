import {DatabaseBoundary} from "../../../shared/interfaces/DatabaseBoundary";
import {Comments} from "../../../entities/comments.entity";
import {AppDataSource} from "../../../config/data-source";

export class CreateCommentDatabase implements DatabaseBoundary {
  execute(data: Comments): Promise<Comments> {
      const commentRepo = AppDataSource.getRepository(Comments)
      const comment = commentRepo.create(data)
      return commentRepo.save(comment)
  }
}