import {Images} from "../../../entities/images.entity";

export class GetListCommentByReviewIdInputDTO {
  reviewId: string
  constructor(reviewId: string) {
    this.reviewId = reviewId
  }
}

export class GetListCommentByReviewIdOutputDTO {
  commentId!: string
  user!: UserDto
  parentId!: string
  content!: string
  createdAt!: Date
  updatedAt!: Date
  images!: ImagesDto[]
}

export class UserDto {
  id!: string
  username!: string
  profile!: ProfileDto | null
}

export class ProfileDto {
  id!: string
  profile_picture!: string
}

export class ImagesDto{
  url!: string
}
