export default class UpdateProfileInputDTO {
  userId!: string
  phone?: string
  bio?: string
  profilePicture?: string
  country?: string
  gender?: string
  birthday?: Date
}

export class UpdateProfileOutputDTO {}
