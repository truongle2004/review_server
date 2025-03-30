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
  imagesUrl!: string
}

export class UserDto {
  id!: string
  username!: string
  email!: string
  roles!: string
  profile!: ProfileDto | null
}

export class ProfileDto {
  id!: string
  phone!: string
  bio!: string
  profile_picture!: string
  country!: string
  gender!: string
  birthday!: Date
}
