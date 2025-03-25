import { JwtPayload } from 'jsonwebtoken'
import UpdateProfileInputDTO from '../dtos/UpdateProfileDTO'
import { IProfilePresenter } from '../presenters/IProfilePresenter'
import { UpdateProfileResponseData } from '../response/UpdateProfileResponseData'
import { IProfileService } from '../services/IProfileService'
import { Request, Response } from 'express'
import { UpdateProfileRequestData } from '../request/UpdateProfileRequestData'

export class ProfileController {
  profileService: IProfileService
  profilePresenter: IProfilePresenter

  constructor(
    profileService: IProfileService,
    profilePresenter: IProfilePresenter
  ) {
    this.profilePresenter = profilePresenter
    this.profileService = profileService
  }

  updateProfile = async (
    req: Request<object, object, UpdateProfileInputDTO, object>,
    res: Response<UpdateProfileResponseData>
  ) => {
    const { phone, bio, profilePicture, country, gender, birthday } = req.body
    const { userId } = req.user as JwtPayload & { userId: string }
    const dto = new UpdateProfileInputDTO()
    dto.userId = userId
    dto.phone = phone
    dto.bio = bio
    dto.profilePicture = profilePicture
    dto.country = country
    dto.gender = gender
    dto.birthday = birthday
    const reqData = new UpdateProfileRequestData(dto)
    await this.profileService.update(reqData)
    const viewModel = this.profilePresenter.getUpdateProfileViewModel()
    res.status(viewModel.status).send(viewModel)
    return
  }
}
