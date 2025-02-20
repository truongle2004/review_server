import {DatabaseBoundary} from "../../../shared/interfaces/DatabaseBoundary";
import {Reviews} from "../../../entities/reviews.entity";
import {AppDataSource} from "../../../config/data-source";

export class FindReviewDatabase implements DatabaseBoundary {

  async execute(data: string): Promise<Reviews> {
      const reviewRepo = AppDataSource.getRepository(Reviews)
      const review = await reviewRepo.findOne({where: {id: data}})
      if (!review) {
          throw new Error("Review not found");
      } else {
          return review;
      }
  }

}